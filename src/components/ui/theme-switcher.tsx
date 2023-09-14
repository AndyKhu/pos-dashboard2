"use client"
import { useTheme } from "next-themes";
import { Button } from "./button";
import { Moon, Sun } from "lucide-react";

const ThemeSwitcher = () => {
  const {theme,setTheme} = useTheme()
  return (
    <Button size="icon" variant="ghost" onClick={()=>setTheme(theme==="light"?"dark":"light")}>
      {theme==="light"?<Sun size={24}/>:<Moon size={24}/>}
    </Button>
  );
}

export default ThemeSwitcher;