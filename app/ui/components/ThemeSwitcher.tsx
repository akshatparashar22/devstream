'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { MoonIcon, SunIcon } from 'lucide-react';

export default function ThemeSwitcher() {
    const { theme, setTheme, resolvedTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    // Prevent hydration mismatch
    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return (
            <div className="p-3 rounded-full bg-muted w-12 h-12 flex items-center justify-center">
                <div className="w-5 h-5 bg-muted-foreground rounded animate-pulse"></div>
            </div>
        );
    }

    const isDark = resolvedTheme === 'dark';

    return (
        <button
            onClick={() => setTheme(isDark ? 'light' : 'dark')}
            className="p-3 rounded-full bg-muted border border-border hover:bg-muted/80 transition-all duration-200 ease-in-out shadow-sm hover:shadow-md"
            aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
        >
            <div className="relative w-5 h-5">
                <SunIcon
                    className={`absolute inset-0 w-5 h-5 text-yellow-500 transition-all duration-300 ${isDark ? 'rotate-90 opacity-0 scale-0' : 'rotate-0 opacity-100 scale-100'
                        }`}
                />
                <MoonIcon
                    className={`absolute inset-0 w-5 h-5 text-foreground transition-all duration-300 ${isDark ? 'rotate-0 opacity-100 scale-100' : '-rotate-90 opacity-0 scale-0'
                        }`}
                />
            </div>
        </button>
    );
}