import { Routes, Route, Navigate } from "react-router-dom"
import Home from "./pages/home/Home"
import About from "./pages/about/About"
import NotFound from "./pages/not found/NotFound"
import EcommerceLandingPage from "./pages/landing pages/ecommerce/EcommerceLandingPage"
import EcommerceThankYou from "./pages/thankyou/EcommerceThankYou"
import InfluencerThankYou from "./pages/thankyou/InfluencerThankYou"
import InfluencerLandingPage from "./pages/landing pages/influencer/InfluencerLandingPage"
import NDAPage from "./pages/nda/NDAPage"

import AdminLoginPage from "./pages/admin/login/components/AdminLoginPage"
import AdminAuthLayout from "./pages/admin/login/AdminAuthLayout"

import AdminDashboardLayout from "./pages/admin/dashboard/AdminDashboardLayout"
import DashboardHome from "./pages/admin/dashboard/pages/DashboardHome"
import Users from "./pages/admin/dashboard/pages/Users"
import Settings from "./pages/admin/dashboard/pages/Settings"
import ProtectedRoute from "./routes/ProtectedRoute"

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/influencer" replace />} />
      <Route path="/aboutus" element={<About />} />
      <Route
        path="/ecommerce"
        element={<EcommerceLandingPage />}
      />
      <Route path="/ecommerce-thank-you" element={<EcommerceThankYou />} />
      <Route path="/influencer" element={<InfluencerLandingPage />} />
      <Route path="/influencer-thank-you" element={<InfluencerThankYou />} />
      <Route path="/nda" element={<NDAPage />} />

      {/* Admin Auth */}
      <Route path="/admin" element={<AdminAuthLayout />}>
        <Route index element={<AdminLoginPage />} />
        <Route path="login" element={<AdminLoginPage />} />
      </Route>

      {/* Admin Dashboard */}
      <Route
        path="/admin/dashboard"
        element={
          <ProtectedRoute>
            <AdminDashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<DashboardHome />} />
        <Route path="users" element={<Users />} />
        <Route path="settings" element={<Settings />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default App;
