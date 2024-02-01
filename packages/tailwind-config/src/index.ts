import { fontFamily } from 'tailwindcss/defaultTheme';
import plugin from 'tailwindcss/plugin';
import { type Config } from 'tailwindcss';
import tailwindAnimate from 'tailwindcss-animate';

export default {
    content: [],
    darkMode: 'class',
    corePlugins: {
        preflight: false,
    },
    theme: {
        extend: {
            colors: {
                border: 'hsl(var(--sa-border) / <alpha-value>)',
                input: 'hsl(var(--sa-input) / <alpha-value>)',
                ring: 'hsl(var(--sa-ring) / <alpha-value>)',
                background: 'hsl(var(--sa-background) / <alpha-value>)',
                foreground: 'hsl(var(--sa-foreground) / <alpha-value>)',
                primary: {
                    DEFAULT: 'hsl(var(--sa-primary) / <alpha-value>)',
                    foreground: 'hsl(var(--sa-primary-foreground) / <alpha-value>)',
                },
                secondary: {
                    DEFAULT: 'hsl(var(--sa-secondary) / <alpha-value>)',
                    foreground: 'hsl(var(--sa-secondary-foreground) / <alpha-value>)',
                },
                destructive: {
                    DEFAULT: 'hsl(var(--sa-destructive) / <alpha-value>)',
                    foreground: 'hsl(var(--sa-destructive-foreground) / <alpha-value>)',
                },
                muted: {
                    DEFAULT: 'hsl(var(--sa-muted) / <alpha-value>)',
                    foreground: 'hsl(var(--sa-muted-foreground) / <alpha-value>)',
                },
                accent: {
                    DEFAULT: 'hsl(var(--sa-accent) / <alpha-value>)',
                    foreground: 'hsl(var(--sa-accent-foreground) / <alpha-value>)',
                },
                popover: {
                    DEFAULT: 'hsl(var(--sa-popover) / <alpha-value>)',
                    foreground: 'hsl(var(--sa-popover-foreground) / <alpha-value>)',
                },
                card: {
                    DEFAULT: 'hsl(var(--sa-card) / <alpha-value>)',
                    foreground: 'hsl(var(--sa-card-foreground) / <alpha-value>)',
                },
            },
            borderRadius: {
                lg: 'var(--sa-radius)',
                md: 'calc(var(--sa-radius) - 2px)',
                sm: 'calc(var(--sa-radius) - 4px)',
            },
            fontFamily: {
                sans: ['var(--sa-font-sans)', ...fontFamily.sans],
            },
            keyframes: {
                'accordion-down': {
                    from: { height: '0' },
                    to: { height: 'var(--radix-accordion-content-height)' },
                },
                'accordion-up': {
                    from: { height: 'var(--radix-accordion-content-height)' },
                    to: { height: '0' },
                },
            },
            animation: {
                'accordion-down': 'accordion-down 300ms ease-out',
                'accordion-up': 'accordion-up 300ms ease-out',
            },
        },
    },
    plugins: [
        tailwindAnimate,
        plugin(({ matchUtilities }) => {
            matchUtilities({
                'border-style': (value) => ({
                    'border-style': value,
                }),
            });
        }),
    ],
} satisfies Config;
