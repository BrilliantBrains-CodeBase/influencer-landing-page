import { useTheme } from "@/hooks/use-theme"
import { Sun, Moon } from "lucide-react"
import { Button } from "@/components/ui/button"

export function ModeToggle() {
  const { theme, setTheme } = useTheme()

  const next = theme === "light" ? "dark" : "light"

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={() => setTheme(next)}
    >
      <Sun className="h-4 w-4 transition dark:opacity-0" />
      <Moon className="h-4 w-4 absolute transition opacity-0 dark:opacity-100" />

      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}
