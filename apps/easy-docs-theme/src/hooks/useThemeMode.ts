import { useEffect, useState } from 'react';

type ThemeMode = 'light' | 'dark' | 'system';

export const useThemeMode = () => {
    const [themeMode, setThemeMode] = useState<ThemeMode>('light');

    useEffect(() => {
        const storedTheme = localStorage.getItem('themeMode') as ThemeMode | null;
        if (storedTheme === 'system' || !storedTheme) {
            const systemPreference = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
            setThemeMode(systemPreference);
            document.documentElement.classList.toggle('dark', systemPreference === 'dark');
            localStorage.setItem('themeMode', systemPreference);
        } else if (storedTheme) {
            setThemeMode(storedTheme);
            document.documentElement.classList.toggle('dark', storedTheme === 'dark');
        }
    }, []);

    useEffect(() => {
        const handleStorage = (event: StorageEvent) => {
            if (event.key === 'themeMode') {
                const newMode = event.newValue as ThemeMode;
                setThemeMode(newMode);
                document.documentElement.classList.toggle('dark', newMode === 'dark');
            }
        };

        window.addEventListener('storage', handleStorage);

        return () => window.removeEventListener('storage', handleStorage);
    }, []);

    useEffect(() => {
        const mediaQueryList = window.matchMedia('(prefers-color-scheme: dark)');

        const handleChange = () => {
            setMode('system');
        };

        mediaQueryList.addEventListener('change', handleChange);

        return () => mediaQueryList.removeEventListener('change', handleChange);
    }, []);

    const setMode = (mode: ThemeMode) => {
        if (mode === 'system') {
            const systemPreference = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
            setThemeMode(systemPreference);
            document.documentElement.classList.toggle('dark', systemPreference === 'dark');
            localStorage.setItem('themeMode', 'system');
        } else {
            setThemeMode(mode);
            document.documentElement.classList.toggle('dark', mode === 'dark');
            localStorage.setItem('themeMode', mode);
        }
    };

    return [themeMode === 'dark', setMode] as const;
};
