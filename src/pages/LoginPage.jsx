import React from 'react';
import { useNavigate } from 'react-router-dom';
import AuthSwitch from '../components/ui/auth-switch';
import { useAuth } from '../context/AuthContext';

export default function LoginPage() {
  const { loginWithEmail, registerWithEmail, loginWithProvider } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async ({ email, password, role }) => {
    const res = await loginWithEmail(email, password, role);
    if (res.success) {
      if (res.user.role === 'admin') navigate('/admin');
      else if (res.user.role === 'seller') navigate('/seller');
      else navigate('/account');
    }
  };

  const handleRegister = async ({ name, email, password, role }) => {
    const res = await registerWithEmail(name, email, password, role);
    if (res.success) {
      if (res.user.role === 'admin') navigate('/admin');
      else if (res.user.role === 'seller') navigate('/seller');
      else navigate('/account');
    }
  };

  const handleSocialLogin = async (provider, role) => {
    const res = await loginWithProvider(provider, role);
    if (res.success) {
      if (res.user.role === 'admin') navigate('/admin');
      else if (res.user.role === 'seller') navigate('/seller');
      else navigate('/account');
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4">
      <AuthSwitch
        onLogin={handleLogin}
        onRegister={handleRegister}
        onSocialLogin={handleSocialLogin}
      />
    </div>
  );
}
