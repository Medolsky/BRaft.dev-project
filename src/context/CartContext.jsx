import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem('webcraft_cart');
    return saved ? JSON.parse(saved) : [];
  });

  const [orders, setOrders] = useState(() => {
    const saved = localStorage.getItem('webcraft_orders');
    return saved ? JSON.parse(saved) : [
      {
        id: 'ORD-9912',
        date: '05/08/2026',
        items: [
          { id: 'tmpl-1', name: 'KopiKraf - Coffee Shop & POS Web App', price: 399000, quantity: 1, licenseType: 'commercial', licenseKey: 'LIC-COMM-9821-X9A' }
        ],
        total: 399000,
        status: 'Selesai',
        customerName: 'Rapiii',
        customerEmail: 'user@webcraft.id'
      }
    ];
  });

  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('webcraft_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('webcraft_orders', JSON.stringify(orders));
  }, [orders]);

  const addToCart = (product, licenseType = 'personal', customPrice = null) => {
    const finalPrice = customPrice !== null ? customPrice : (product.licenses ? product.licenses[licenseType] : product.price);
    const cartItemId = `${product.id}-${licenseType}`;

    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.cartItemId === cartItemId);
      if (existing) {
        return prevCart.map((item) =>
          item.cartItemId === cartItemId ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [
        ...prevCart,
        {
          ...product,
          cartItemId,
          price: finalPrice,
          licenseType,
          quantity: 1
        }
      ];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (cartItemId) => {
    setCart((prevCart) => prevCart.filter((item) => item.cartItemId !== cartItemId));
  };

  const updateQuantity = (cartItemId, delta) => {
    setCart((prevCart) =>
      prevCart
        .map((item) => {
          if (item.cartItemId === cartItemId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean)
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const calculateTotal = () => {
    return cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  };

  const checkoutOrder = (customerInfo = {}) => {
    if (cart.length === 0) return null;

    const itemsWithLicenses = cart.map(item => ({
      ...item,
      licenseKey: 'LIC-' + (item.licenseType || 'STD').toUpperCase() + '-' + Math.floor(1000 + Math.random() * 9000) + '-KEY'
    }));

    const newOrder = {
      id: 'ORD-' + Math.floor(1000 + Math.random() * 9000),
      date: new Date().toLocaleDateString('id-ID'),
      items: itemsWithLicenses,
      total: calculateTotal(),
      status: 'Paid / Confirmed',
      customerName: customerInfo.name || 'Pelanggan WebCraft',
      customerEmail: customerInfo.email || 'client@webcraft.id',
    };

    setOrders((prev) => [newOrder, ...prev]);
    clearCart();
    setIsCartOpen(false);
    return newOrder;
  };

  const updateOrderStatus = (orderId, newStatus) => {
    setOrders((prev) =>
      prev.map((ord) => (ord.id === orderId ? { ...ord, status: newStatus } : ord))
    );
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        orders,
        isCartOpen,
        setIsCartOpen,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        calculateTotal,
        checkoutOrder,
        updateOrderStatus
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
