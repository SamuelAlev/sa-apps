import { withAppBridgeBlockStubs } from '@frontify/app-bridge';
import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { TiltImageBlock } from '../src/TiltImageBlock';

const TILT_IMAGE_BLOCK_TEST_ID = 'masonry-block';

describe.skip('Tilt Image Block', () => {
    // it('renders the block', () => {
    //     const [TiltImageBlockWithStubs] = withAppBridgeBlockStubs(TiltImageBlock);
    //     const { getByTestId } = render(<TiltImageBlockWithStubs />);
    //     expect(getByTestId(TILT_IMAGE_BLOCK_TEST_ID)).toBeTruthy();
    // });
});
