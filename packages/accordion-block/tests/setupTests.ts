import { afterEach, beforeAll } from 'vitest';
import { cleanup, configure } from '@testing-library/react';

import nodeCrypto from 'crypto';
globalThis.crypto = {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    getRandomValues(buffer) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
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
