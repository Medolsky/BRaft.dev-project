import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';

import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { ProjectProvider } from './context/ProjectContext';
import { MarketplaceProvider } from './context/MarketplaceContext';
import { ChatProvider } from './context/ChatContext';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ChatWidget from './components/ChatWidget';
import CartDrawer from './components/CartDrawer';
import ProtectedRoute from './components/ProtectedRoute';

import HomePage from './pages/HomePage';
import ServicesPage from './pages/ServicesPage';
import TemplatesPage from './pages/TemplatesPage';
import TemplateDetailPage from './pages/TemplateDetailPage';
import PortfolioPage from './pages/PortfolioPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import LoginPage from './pages/LoginPage';

import CustomerDashboard from './pages/customer/CustomerDashboard';
import MyProjectsPage from './pages/customer/MyProjectsPage';
import DownloadsPage from './pages/customer/DownloadsPage';

import SellerDashboard from './pages/seller/SellerDashboard';
import UploadTemplatePage from './pages/seller/UploadTemplatePage';
import SellerPayoutPage from './pages/seller/SellerPayoutPage';

import AdminDashboard from './pages/admin/AdminDashboard';
import TemplateModerationPage from './pages/admin/TemplateModerationPage';
import ServiceOrdersPage from './pages/admin/ServiceOrdersPage';
import AdminChatConsole from './pages/admin/AdminChatConsole';

export default function App() {
  return (
    <AuthProvider>
      <MarketplaceProvider>
        <ProjectProvider>
          <CartProvider>
            <ChatProvider>
              <Router>
                <div className="relative min-h-screen overflow-x-hidden flex flex-col justify-between bg-slate-950 text-slate-100 font-heading">
                  {/* Ambient Glow Orbs */}
                  <div className="bg-glow-orb orb-1"></div>
                  <div className="bg-glow-orb orb-2"></div>
                  <div className="bg-glow-orb orb-3"></div>
                  <div className="grid-overlay"></div>

                  <Navbar />

                  <main className="flex-1">
                    <Routes>
                      {/* Public Routes */}
                      <Route path="/" element={<HomePage />} />
                      <Route path="/services" element={<ServicesPage />} />
                      <Route path="/templates" element={<TemplatesPage />} />
                      <Route path="/template/:id" element={<TemplateDetailPage />} />
                      <Route path="/portfolio" element={<PortfolioPage />} />
                      <Route path="/about" element={<AboutPage />} />
                      <Route path="/contact" element={<ContactPage />} />
                      <Route path="/login" element={<LoginPage />} />

                      {/* Customer Dashboard Routes */}
                      <Route
                        path="/account"
                        element={
                          <ProtectedRoute>
                            <CustomerDashboard />
                          </ProtectedRoute>
                        }
                      />
                      <Route
                        path="/account/projects"
                        element={
                          <ProtectedRoute>
                            <MyProjectsPage />
                          </ProtectedRoute>
                        }
                      />
                      <Route
                        path="/account/downloads"
                        element={
                          <ProtectedRoute>
                            <DownloadsPage />
                          </ProtectedRoute>
                        }
                      />

                      {/* Seller Dashboard Routes */}
                      <Route
                        path="/seller"
                        element={
                          <ProtectedRoute requireSeller={true}>
                            <SellerDashboard />
                          </ProtectedRoute>
                        }
                      />
                      <Route
                        path="/seller/add-template"
                        element={
                          <ProtectedRoute requireSeller={true}>
                            <UploadTemplatePage />
                          </ProtectedRoute>
                        }
                      />
                      <Route
                        path="/seller/payouts"
                        element={
                          <ProtectedRoute requireSeller={true}>
                            <SellerPayoutPage />
                          </ProtectedRoute>
                        }
                      />

                      {/* Admin Panel Routes */}
                      <Route
                        path="/admin"
                        element={
                          <ProtectedRoute requireAdmin={true}>
                            <AdminDashboard />
                          </ProtectedRoute>
                        }
                      />
                      <Route
                        path="/admin/templates"
                        element={
                          <ProtectedRoute requireAdmin={true}>
                            <TemplateModerationPage />
                          </ProtectedRoute>
                        }
                      />
                      <Route
                        path="/admin/orders"
                        element={
                          <ProtectedRoute requireAdmin={true}>
                            <ServiceOrdersPage />
                          </ProtectedRoute>
                        }
                      />
                      <Route
                        path="/admin/chat"
                        element={
                          <ProtectedRoute requireAdmin={true}>
                            <AdminChatConsole />
                          </ProtectedRoute>
                        }
                      />
                    </Routes>
                  </main>

                  <Footer />
                  <ChatWidget />
                  <CartDrawer />
                </div>
              </Router>
            </ChatProvider>
          </CartProvider>
        </ProjectProvider>
      </MarketplaceProvider>
    </AuthProvider>
  );
}
