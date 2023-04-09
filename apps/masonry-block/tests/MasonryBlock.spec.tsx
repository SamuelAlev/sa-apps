import { describe, expect, it } from 'vitest';
import { withAppBridgeBlockStubs } from '@frontify/app-bridge';
import { render } from '@testing-library/react';

import { MasonryBlock } from '../src/MasonryBlock';

const MASONRY_BLOCK_TEST_ID = 'masonry-block';

describe('Masonry Block', () => {
    it('renders the block', () => {
        const [MasonryBlockWithStubs] = withAppBridgeBlockStubs(MasonryBlock);
        const { getByTestId } = render(<MasonryBlockWithStubs />);

        expect(getByTestId(MASONRY_BLOCK_TEST_ID)).toBeTruthy();
    });
});
