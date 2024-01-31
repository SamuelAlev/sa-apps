import { afterEach, beforeAll } from 'vitest';
import { cleanup, configure } from '@testing-library/react';

globalThis.ResizeObserver = class ResizeObserver {
    observe() {
        // do nothing
    }

    unobserve() {
        // do nothing
    }

    disconnect() {
        // do nothing
    }
};

globalThis.structuredClone = <T>(data: unknown) => JSON.parse(JSON.stringify(data)) as T;

beforeAll(() => {
    configure({ testIdAttribute: 'data-test-id' });
});

afterEach(() => {
    cleanup();
});
