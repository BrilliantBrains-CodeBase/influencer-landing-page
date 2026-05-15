import { useState } from "react"
import { motion } from "framer-motion"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Eye, EyeOff, Loader2 } from "lucide-react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { getCsrfToken } from "@/lib/csrf";

const AdminLoginPage = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  setLoading(true);

  try {
    const csrfToken = await getCsrfToken();

    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/api/auth/login`,
      { email, password },
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-Token": csrfToken,
        },
      }
    );

    localStorage.setItem("user", JSON.stringify(response.data.user));
    navigate("/admin/dashboard", { replace: true });

  } catch (err) {
    console.error("Login failed", err);
  } finally {
    setLoading(false);
  }
};


  return (
    <div 
      className="min-h-screen flex items-center justify-center"
      style={{
        background: "linear-gradient(0deg, #EDEDED, #EDEDED), linear-gradient(201.53deg, #FE8C5B -1.6%, #FE8D45 23.06%, #FE611C 48.66%, #FF8841 87.19%, #F44F17 102.98%)",
      }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-6xl"
      >
        <Card className="grid grid-cols-1 lg:grid-cols-2 overflow-hidden rounded-[32px] shadow-2xl bg-white">
          
          {/* LEFT FORM SECTION */}
          <div className="p-12 lg:p-16 flex flex-col justify-center">
            {/* Logo */}
            <div className="mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#FE611C]/30 bg-white">
                <span className="text-sm font-medium text-[#FE611C]">Brilliant Brains</span>
              </div>
            </div>

            {/* Heading */}
            <div className="mb-10">
              <h1 className="text-4xl font-semibold tracking-tight text-gray-900 mb-3">
                Welcome To Brilliant Brains
              </h1>
              <p className="text-base text-gray-600">
                Access your dashboard and clients
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm text-gray-600">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="example@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-12 rounded-xl border-gray-200 bg-gray-50/50 px-4 text-gray-900 placeholder:text-gray-400"
                  required
                />
              </div>

              <div className="space-y-2 relative">
                <Label htmlFor="password" className="text-sm text-gray-600">
                  Password
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••••••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="h-12 rounded-xl border-gray-200 bg-gray-50/50 px-4 pr-12 text-gray-900"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full h-12 rounded-xl bg-[#FE611C] hover:bg-[#F44F17] text-white font-medium text-base shadow-sm transition-all"
                disabled={loading}
              >
                {loading ? <Loader2 className="w-6 h-6 animate-spin text-white"/> : "Login"}
              </Button>
            </form>
          </div>

          {/* RIGHT IMAGE SECTION */}
          <div className="hidden lg:block relative bg-gradient-to-br from-gray-50 to-gray-100">
            <img
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&auto=format&fit=crop&q=80"
              alt="Team collaboration"
              className="h-full w-full object-cover"
            />

            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-tr from-[#FE611C]/60 to-transparent" />

            {/* Orange notification card */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="absolute top-8 right-8 bg-[#FE8D45] rounded-2xl shadow-lg p-4 min-w-[200px]"
            >
              <div className="flex items-start gap-3">
                <div className="flex-1">
                  <h3 className="text-sm font-semibold text-white mb-0.5">
                    Task Review With Team
                  </h3>
                  <p className="text-xs text-white/90">
                    09:30am-10:00am
                  </p>
                </div>
                <div className="flex gap-1">
                  <div className="w-2 h-2 rounded-full bg-white"></div>
                  <div className="w-2 h-2 rounded-full bg-green-400"></div>
                </div>
              </div>
            </motion.div>

            {/* Team avatars floating */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="absolute top-1/2 right-12 -translate-y-1/2 flex flex-col gap-3"
            >
              <div className="w-14 h-14 rounded-full bg-white shadow-lg overflow-hidden border-2 border-white">
                <img src="https://i.pravatar.cc/150?img=5" alt="Team member" className="w-full h-full object-cover" />
              </div>
              <div className="w-14 h-14 rounded-full bg-white shadow-lg overflow-hidden border-2 border-white">
                <img src="https://i.pravatar.cc/150?img=32" alt="Team member" className="w-full h-full object-cover" />
              </div>
              <div className="w-14 h-14 rounded-full bg-white shadow-lg overflow-hidden border-2 border-white">
                <img src="https://i.pravatar.cc/150?img=45" alt="Team member" className="w-full h-full object-cover" />
              </div>
            </motion.div>

            {/* Calendar widget */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="absolute bottom-8 left-8 right-8 bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl p-4"
            >
              {/* Week days */}
              <div className="grid grid-cols-7 gap-1 mb-3 text-center">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                  <div key={day} className="text-[10px] font-medium text-gray-500">
                    {day}
                  </div>
                ))}
                {[22, 23, 24, 25, 26, 27, 28].map((date, i) => (
                  <div
                    key={date}
                    className={`text-xs font-medium py-1 rounded-lg ${
                      i === 4 ? 'bg-[#FE611C] text-white' : 'text-gray-700'
                    }`}
                  >
                    {date}
                  </div>
                ))}
              </div>

              {/* Meeting card */}
              <div className="border-t border-gray-100 pt-3">
                <div className="flex items-center gap-3">
                  <div className="w-1 h-12 bg-[#FE611C] rounded-full"></div>
                  <div className="flex-1">
                    <h4 className="text-sm font-semibold text-gray-900 mb-0.5">
                      Daily Meeting
                    </h4>
                    <p className="text-xs text-gray-500">
                      10:00pm-01:00pm
                    </p>
                  </div>
                  <div className="flex -space-x-2">
                    <div className="w-7 h-7 rounded-full bg-gray-300 border-2 border-white overflow-hidden">
                      <img src="https://i.pravatar.cc/150?img=12" alt="Attendee" className="w-full h-full object-cover" />
                    </div>
                    <div className="w-7 h-7 rounded-full bg-gray-300 border-2 border-white overflow-hidden">
                      <img src="https://i.pravatar.cc/150?img=20" alt="Attendee" className="w-full h-full object-cover" />
                    </div>
                    <div className="w-7 h-7 rounded-full bg-gray-300 border-2 border-white overflow-hidden">
                      <img src="https://i.pravatar.cc/150?img=33" alt="Attendee" className="w-full h-full object-cover" />
                    </div>
                    <div className="w-7 h-7 rounded-full bg-[#FE611C] border-2 border-white flex items-center justify-center">
                      <span className="text-[10px] font-medium text-white">+2</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Orange time indicator */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="absolute top-1/3 right-8 bg-[#FE8D45] text-white text-xs font-medium px-3 py-1 rounded-full shadow-md"
            >
              09:30am-10:00am
            </motion.div>
          </div>
        </Card>
      </motion.div>
    </div>
  )
}

export default AdminLoginPage