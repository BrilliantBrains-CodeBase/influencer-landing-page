import { useEffect, useState } from "react"
import { ThemeContext } from "@/context/theme-context"
import type { Theme } from "@/context/theme-context"



export function ThemeProvider({
  children,
  defaultTheme = "light"
}: {
  children: React.ReactNode
  defaultTheme?: Theme
}) {
  const [theme, setThemeState] = useState<Theme>(() => {
    return (localStorage.getItem("vite-theme") as Theme) || defaultTheme
  })

  function applyTheme(t: Theme) {
    const root = document.documentElement
    root.classList.remove("light", "dark")
    root.classList.add(t)
  }

  useEffect(() => {
    applyTheme(theme)
  }, [theme])

  function setTheme(t: Theme) {
    localStorage.setItem("vite-theme", t)
    setThemeState(t)
  }

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}
