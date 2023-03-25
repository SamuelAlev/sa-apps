import { afterEach, beforeAll } from 'vitest';
import { cleanup, configure } from '@testing-library/react';

import nodeCrypto from 'crypto';
globalThis.crypto = {
    getRandomValues(buffer) {
        return nodeCrypto.randomFillSync(buffer);
    },
};

globalThis.structuredClone = (data: unknown) => JSON.parse(JSON.stringify(data));

beforeAll(() => {
    configure({ testIdAttribute: 'data-test-id' });
});

afterEach(() => {
    cleanup();
});
