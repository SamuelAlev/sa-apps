import nodeCrypto from 'node:crypto';
import { afterEach, beforeAll } from 'vitest';
import { cleanup, configure } from '@testing-library/react';

globalThis.crypto = {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    getRandomValues(buffer) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
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
