import { withAppBridgeBlockStubs } from '@frontify/app-bridge';
import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { MasonryBlock } from '../src/MasonryBlock';

const MASONRY_BLOCK_TEST_ID = 'masonry-block';

describe.skip('Masonry Block', () => {
    it('renders the block', () => {
        const [MasonryBlockWithStubs] = withAppBridgeBlockStubs(MasonryBlock);
        const { getByTestId } = render(<MasonryBlockWithStubs />);

        expect(getByTestId(MASONRY_BLOCK_TEST_ID)).toBeTruthy();
    });
});
