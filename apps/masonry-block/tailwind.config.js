const plugin = require('tailwindcss/plugin');

module.exports = {
    content: ['src/**/*.{ts,tsx}', '../../packages/*/src/**/*.{ts,tsx}'],
    corePlugins: {
        preflight: false,
    },
    plugins: [
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
