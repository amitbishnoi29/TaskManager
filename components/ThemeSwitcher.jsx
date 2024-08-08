// app/components/ThemeSwitcher.tsx
"use client";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function ThemeSwitcher() {
    const [mounted, setMounted] = useState(false)
    const { theme, setTheme } = useTheme()

    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) return null

    return (
        <div>
            The current theme is: {theme}
            <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>ChangeTheme</button>
        </div>
    )
};