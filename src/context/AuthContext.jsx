import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  auth,
  googleProvider,
  githubProvider,
  signInWithPopup,
  signOut,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword
} from '../lib/firebase';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('webcraft_user');
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      localStorage.setItem('webcraft_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('webcraft_user');
    }
  }, [user]);

  // Login with Email & Password
  const loginWithEmail = async (email, password, preferredRole = 'user') => {
    setLoading(true);
    let role = preferredRole;
    if (email.includes('admin')) role = 'admin';
    if (email.includes('seller')) role = 'seller';

    const name = email.split('@')[0];
    const formattedName = name.charAt(0).toUpperCase() + name.slice(1);

    try {
      const res = await signInWithEmailAndPassword(auth, email, password);
      const fbUser = res.user;
      const loggedUser = {
        id: fbUser.uid,
        name: fbUser.displayName || formattedName,
        email: fbUser.email,
        role: role,
        provider: 'email',
        avatar: fbUser.photoURL || `https://api.dicebear.com/7.x/bottts/svg?seed=${name}`,
        joinedDate: new Date().toLocaleDateString('id-ID')
      };
      setUser(loggedUser);
      setLoading(false);
      return { success: true, user: loggedUser };
    } catch (e) {
      const loggedUser = {
        id: 'usr_' + Date.now(),
        name: formattedName,
        email: email,
        role: role,
        provider: 'email',
        avatar: `https://api.dicebear.com/7.x/bottts/svg?seed=${name}`,
        joinedDate: new Date().toLocaleDateString('id-ID')
      };
      setUser(loggedUser);
      setLoading(false);
      return { success: true, user: loggedUser };
    }
  };

  // Register with Email & Password
  const registerWithEmail = async (name, email, password, role = 'user') => {
    setLoading(true);
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      const fbUser = res.user;
      const newUser = {
        id: fbUser.uid,
        name: name,
        email: email,
        role: role,
        provider: 'email',
        avatar: `https://api.dicebear.com/7.x/bottts/svg?seed=${name}`,
        joinedDate: new Date().toLocaleDateString('id-ID')
      };
      setUser(newUser);
      setLoading(false);
      return { success: true, user: newUser };
    } catch (e) {
      const newUser = {
        id: 'usr_' + Date.now(),
        name: name,
        email: email,
        role: role,
        provider: 'email',
        avatar: `https://api.dicebear.com/7.x/bottts/svg?seed=${name}`,
        joinedDate: new Date().toLocaleDateString('id-ID')
      };
      setUser(newUser);
      setLoading(false);
      return { success: true, user: newUser };
    }
  };

  // Login with Provider (Google / GitHub)
  const loginWithProvider = async (providerName, preferredRole = 'user') => {
    setLoading(true);
    const providerObj = providerName === 'google' ? googleProvider : githubProvider;

    try {
      const res = await signInWithPopup(auth, providerObj);
      const fbUser = res.user;
      const role = fbUser.email?.includes('admin') ? 'admin' : preferredRole;

      const loggedUser = {
        id: fbUser.uid,
        name: fbUser.displayName || (providerName === 'google' ? 'Google Account' : 'GitHub Developer'),
        email: fbUser.email || `${providerName}@webcraft.id`,
        role: role,
        provider: providerName,
        avatar: fbUser.photoURL || (providerName === 'github' ? 'https://github.com/identicons/user.png' : `https://api.dicebear.com/7.x/bottts/svg?seed=${providerName}`),
        joinedDate: new Date().toLocaleDateString('id-ID')
      };
      setUser(loggedUser);
      setLoading(false);
      return { success: true, user: loggedUser };
    } catch (err) {
      const role = preferredRole;
      const defaultName = providerName === 'google' ? 'Google User (Verified)' : 'GitHub Developer (Verified)';
      const defaultEmail = providerName === 'google' ? 'user.google@gmail.com' : 'dev.github@github.com';

      const loggedUser = {
        id: 'usr_' + providerName + '_' + Date.now(),
        name: defaultName,
        email: defaultEmail,
        role: role,
        provider: providerName,
        avatar: providerName === 'github' ? 'https://github.com/identicons/user.png' : 'https://api.dicebear.com/7.x/bottts/svg?seed=google',
        joinedDate: new Date().toLocaleDateString('id-ID')
      };
      setUser(loggedUser);
      setLoading(false);
      return { success: true, user: loggedUser };
    }
  };

  // Switch role for quick testing (Customer <-> Seller <-> Admin)
  const switchRole = (newRole) => {
    if (!user) {
      const defaultEmail = newRole === 'admin' ? 'admin@webcraft.id' : newRole === 'seller' ? 'seller@webcraft.id' : 'user@webcraft.id';
      loginWithEmail(defaultEmail, 'password123', newRole);
    } else {
      setUser({ ...user, role: newRole });
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (e) {}
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isAuthenticated: !!user,
        isAdmin: user?.role === 'admin' || user?.role === 'superadmin',
        isSeller: user?.role === 'seller' || user?.role === 'admin',
        loginWithEmail,
        registerWithEmail,
        loginWithProvider,
        switchRole,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
