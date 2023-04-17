const { fontFamily } = require('tailwindcss/defaultTheme');
const plugin = require('tailwindcss/plugin');

/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: 'class',
    corePlugins: {
        preflight: false,
    },
    theme: {
        extend: {
            colors: {
                border: 'hsl(var(--sa-border))',
                input: 'hsl(var(--sa-input))',
                ring: 'hsl(var(--sa-ring))',
                background: 'hsl(var(--sa-background))',
                foreground: 'hsl(var(--sa-foreground))',
                primary: {
                    DEFAULT: 'hsl(var(--sa-primary))',
                    foreground: 'hsl(var(--sa-primary-foreground))',
                },
                secondary: {
                    DEFAULT: 'hsl(var(--sa-secondary))',
                    foreground: 'hsl(var(--sa-secondary-foreground))',
                },
                destructive: {
                    DEFAULT: 'hsl(var(--sa-destructive))',
                    foreground: 'hsl(var(--sa-destructive-foreground))',
                },
                muted: {
                    DEFAULT: 'hsl(var(--sa-muted))',
                    foreground: 'hsl(var(--sa-muted-foreground))',
                },
                accent: {
                    DEFAULT: 'hsl(var(--sa-accent))',
                    foreground: 'hsl(var(--sa-accent-foreground))',
                },
                popover: {
                    DEFAULT: 'hsl(var(--sa-popover))',
                    foreground: 'hsl(var(--sa-popover-foreground))',
                },
                card: {
                    DEFAULT: 'hsl(var(--sa-card))',
                    foreground: 'hsl(var(--sa-card-foreground))',
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
                    from: { height: 0 },
                    to: { height: 'var(--sa-radix-accordion-content-height)' },
                },
                'accordion-up': {
                    from: { height: 'var(--sa-radix-accordion-content-height)' },
                    to: { height: 0 },
                },
            },
            animation: {
                'accordion-down': 'accordion-down 300ms ease-out',
                'accordion-up': 'accordion-up 300ms ease-out',
            },
        },
    },
    plugins: [
        require('tailwindcss-animate'),
        plugin(({ addVariant, e }) => {
            addVariant('expanded', ({ modifySelectors, separator }) => {
                modifySelectors(({ className }) => {
                    return `.${e(`expanded${separator}${className}`)}[aria-expanded='true']`;
                });
            });
        }),
        plugin(({ matchUtilities }) => {
            matchUtilities({
                'border-style': (value) => ({
                    'border-style': value,
                }),
            });
        }),
    ],
};
