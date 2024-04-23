import { withAppBridgeBlockStubs } from '@frontify/app-bridge';
import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { StackableImagesBlock } from '../src/StackableImagesBlock';

const STACKABLE_IMAGES_BLOCK_TEST_ID = 'stackable-images-block';

describe.skip('Stackable Images Block', () => {
    // it('renders the block', () => {
    //     const [StackableImagesBlockWithStubs] = withAppBridgeBlockStubs(StackableImagesBlock);
    //     const { getByTestId } = render(<StackableImagesBlockWithStubs />);
    //     expect(getByTestId(STACKABLE_IMAGES_BLOCK_TEST_ID)).toBeTruthy();
    // });
});
