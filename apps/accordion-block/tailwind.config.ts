import tailwindConfig from '@sa-apps/tailwind-config';

export default {
    presets: [tailwindConfig],
    content: ['src/**/*.{ts,tsx}', 'node_modules/@sa-apps/**/*/src/**/*.{ts,tsx}'],
};
