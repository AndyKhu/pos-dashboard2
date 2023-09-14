"use client"
import { useTheme } from "next-themes";
import { Button } from "./button";
import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

const ThemeSwitcher = () => {
  const [mounted, setMounted] = useState(false)
  const {theme,setTheme} = useTheme()
   // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }
  return (
    <Button size="icon" variant="ghost" onClick={()=>setTheme(theme==="light"?"dark":"light")}>
      {theme==="light"?<Sun size={24}/>:<Moon size={24}/>}
    </Button>
  );
}

export default ThemeSwitcher;