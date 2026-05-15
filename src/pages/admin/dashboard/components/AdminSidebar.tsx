import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar"
import { LayoutDashboard, Users, Settings, LogOut } from "lucide-react"
import { NavLink } from "react-router-dom"

const AdminSidebar = () => {
  return (
    <Sidebar>
      <SidebarHeader className="px-4 py-3 font-bold text-lg">
        BrilliantBrains
      </SidebarHeader>

      <SidebarContent>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <NavLink to="/admin/dashboard">
                <LayoutDashboard />
                Dashboard
              </NavLink>
            </SidebarMenuButton>
          </SidebarMenuItem>

          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <NavLink to="/admin/dashboard/users">
                <Users />
                Users
              </NavLink>
            </SidebarMenuButton>
          </SidebarMenuItem>

          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <NavLink to="/admin/dashboard/settings">
                <Settings />
                Settings
              </NavLink>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>

      <SidebarFooter className="px-4">
        <button className="flex items-center gap-2 text-sm text-red-500">
          <LogOut size={16} />
          Logout
        </button>
      </SidebarFooter>
    </Sidebar>
  )
}

export default AdminSidebar
