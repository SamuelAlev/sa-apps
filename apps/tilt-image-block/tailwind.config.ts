import tailwindConfig from '@sa-apps/tailwind-config';
import plugin from 'tailwindcss/plugin';

export default {
    presets: [tailwindConfig],
    content: ['src/**/*.{ts,tsx}', 'node_modules/@sa-apps/**/*/src/**/*.{ts,tsx}'],
    plugins: [
        plugin(({ matchUtilities, theme }) => {
            matchUtilities(
                {
                    'translate-z': (value) => ({
                        '--tw-translate-z': value,
                        transform:
                            'translate3d(var(--tw-translate-x), var(--tw-translate-y), var(--tw-translate-z)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))',
                    }),
                },
                { values: theme('translate'), supportsNegativeValues: true },
            );
        }),
    ],
};
