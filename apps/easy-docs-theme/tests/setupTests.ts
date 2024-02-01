import nodeCrypto from 'node:crypto';
import { cleanup, configure } from '@testing-library/react';
import { afterEach, beforeAll } from 'vitest';

globalThis.crypto = {
    // @ts-expect-error
    getRandomValues(buffer) {
        // @ts-expect-error
        return nodeCrypto.randomFillSync(buffer);
    },
};

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
