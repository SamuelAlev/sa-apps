import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import { resolve } from 'node:path';

export default defineConfig({
    plugins: [react()],
    test: {
        environment: 'jsdom',
        coverage: {
            all: true,
            provider: 'c8',
            reporter: ['text', 'lcov', 'html'],
            include: ['src/**/*.{ts,tsx}'],
            exclude: ['**/tests/**'],
        },
        setupFiles: [resolve(__dirname, 'tests/setupTests.ts')],
    },
});
