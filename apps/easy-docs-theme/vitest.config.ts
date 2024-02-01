import { resolve } from 'node:path';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vitest/config';

export default defineConfig({
    plugins: [react()],
    test: {
        coverage: {
            all: true,
            provider: 'v8',
            reporter: ['text', 'lcov', 'html'],
            include: ['src/**/*.{ts,tsx}'],
            exclude: ['**/tests/**'],
        },
        setupFiles: [resolve(__dirname, 'tests/setupTests.ts')],
    },
});
