import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import AdminSidebar from "./components/AdminSidebar"
import { Outlet } from "react-router-dom"

const AdminDashboardLayout = () => {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AdminSidebar />

        <main className="flex-1 p-6 bg-muted/40">
          {/* Mobile toggle */}
          <SidebarTrigger />

          <Outlet />
        </main>
      </div>
    </SidebarProvider>
  )
}

export default AdminDashboardLayout
