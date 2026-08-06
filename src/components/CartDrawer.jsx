import React from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useProjects } from '../context/ProjectContext';

export default function CartDrawer() {
  const { cart, isCartOpen, setIsCartOpen, removeFromCart, updateQuantity, calculateTotal, checkoutOrder } = useCart();
  const { user } = useAuth();
  const { createProject } = useProjects();

  if (!isCartOpen) return null;

  const formatRupiah = (num) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(num);
  };

  const handleCheckout = () => {
    const order = checkoutOrder({ name: user?.name, email: user?.email });
    if (!order) return;

    // Check if cart contains agency service package to automatically initiate project
    const agencyPackage = order.items.find(i => i.packageName || i.id.startsWith('pkg-'));
    if (agencyPackage) {
      createProject({
        packageName: agencyPackage.name,
        customerName: order.customerName,
        customerEmail: order.customerEmail,
        brief: 'Pemesanan jasa via checkout cart.'
      });
    }

    const itemsList = order.items.map(i => `- ${i.name} (${i.licenseType ? 'Lisensi: ' + i.licenseType.toUpperCase() : 'Package'}) x${i.quantity}: ${formatRupiah(i.price * i.quantity)}`).join('\n');
    const msg = `Halo WebCraft, saya telah menyelesaikan pesanan #${order.id}!\n\nDetail Pembeli:\n- Nama: ${order.customerName}\n- Email: ${order.customerEmail}\n\nItem Pesanan:\n${itemsList}\n\nTotal Biaya: ${formatRupiah(order.total)}\n\nMohon verifikasi & petunjuk selanjutnya. Terima kasih!`;

    window.open(`https://wa.me/62895414739150?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/75 backdrop-blur-sm flex justify-end animate-in fade-in">
      <div className="w-full max-w-md bg-slate-900 border-l border-slate-700/80 h-full flex flex-col justify-between shadow-2xl p-6 relative">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10">
          <div className="flex items-center gap-2 text-white font-bold text-lg">
            <i className="fa-solid fa-cart-shopping text-accentCyan"></i>
            <span>Keranjang Belanja WebCraft</span>
          </div>
          <button
            type="button"
            className="text-slate-400 hover:text-white text-xl p-1"
            onClick={() => setIsCartOpen(false)}
          >
            &times;
          </button>
        </div>

        {/* Item List */}
        <div className="flex-1 overflow-y-auto py-4 space-y-4">
          {cart.length === 0 ? (
            <div className="text-center py-16 text-slate-400 space-y-3">
              <i className="fa-solid fa-basket-shopping text-5xl text-slate-600"></i>
              <p className="font-semibold text-base">Keranjang Anda masih kosong</p>
              <p className="text-xs">Jelajahi Services atau Marketplace Templates untuk menambahkan barang.</p>
            </div>
          ) : (
            cart.map((item) => (
              <div key={item.cartItemId} className="flex gap-3 bg-white/5 border border-white/10 rounded-2xl p-3 items-center">
                <img
                  src={item.thumbnail || item.image || 'assets/umkm.png'}
                  alt={item.name}
                  className="w-16 h-16 rounded-xl object-cover border border-white/10"
                />
                <div className="flex-1 min-w-0">
                  <h4 className="text-xs font-bold text-white truncate">{item.name}</h4>
                  {item.licenseType && (
                    <span className="text-[10px] bg-accentCyan/20 text-accentCyan px-2 py-0.5 rounded font-bold uppercase block w-fit mt-0.5">
                      Lisensi: {item.licenseType}
                    </span>
                  )}
                  <p className="text-xs text-accentCyan font-bold mt-1">{formatRupiah(item.price)}</p>

                  <div className="flex items-center gap-2 mt-1.5">
                    <button
                      type="button"
                      className="w-5 h-5 rounded bg-white/10 text-white hover:bg-white/20 flex items-center justify-center font-bold text-xs"
                      onClick={() => updateQuantity(item.cartItemId, -1)}
                    >
                      -
                    </button>
                    <span className="text-xs font-extrabold text-white">{item.quantity}</span>
                    <button
                      type="button"
                      className="w-5 h-5 rounded bg-white/10 text-white hover:bg-white/20 flex items-center justify-center font-bold text-xs"
                      onClick={() => updateQuantity(item.cartItemId, 1)}
                    >
                      +
                    </button>
                  </div>
                </div>

                <button
                  type="button"
                  className="text-red-400 hover:text-red-300 p-2"
                  onClick={() => removeFromCart(item.cartItemId)}
                  title="Hapus"
                >
                  <i className="fa-solid fa-trash-can"></i>
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer Checkout Summary */}
        {cart.length > 0 && (
          <div className="pt-4 border-t border-white/10 space-y-4">
            <div className="flex justify-between items-center text-white">
              <span className="text-sm font-semibold text-slate-300">Total Pembayaran:</span>
              <span className="text-xl font-extrabold text-accentCyan">{formatRupiah(calculateTotal())}</span>
            </div>

            <button
              type="button"
              className="w-full btn btn-primary btn-glow py-3 font-extrabold flex items-center justify-center gap-2 text-sm"
              onClick={handleCheckout}
            >
              <i className="fa-brands fa-whatsapp text-lg"></i> Process Checkout & Kirim WA
            </button>
            <p className="text-[11px] text-slate-400 text-center">
              Pembelian template akan langsung menghasilkan License Key & akses download di dashboard.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
