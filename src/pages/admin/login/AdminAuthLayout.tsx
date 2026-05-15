import { Outlet } from "react-router-dom"

const AdminAuthLayout: React.FC = () => {
  return (
    <div className="min-h-screen">
      <Outlet />
    </div>
  )
}

export default AdminAuthLayout
