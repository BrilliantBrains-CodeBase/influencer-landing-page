import { Routes, Route } from "react-router-dom"
import About from "./pages/about/About"
import NotFound from "./pages/not found/NotFound"
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
      <Route path="/" element={<InfluencerLandingPage />} />
      <Route path="/aboutus" element={<About />} />
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
