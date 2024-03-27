import { withAppBridgeBlockStubs } from '@frontify/app-bridge';
import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { MarqueeBlock } from '../src/MarqueeBlock';

const MARQUEE_BLOCK_TEST_ID = 'marquee-block';

describe.skip('Marquee Block', () => {
    // it('renders the block', () => {
    //     const [MarqueeBlockWithStubs] = withAppBridgeBlockStubs(MarqueeBlock);
    //     const { getByTestId } = render(<MarqueeBlockWithStubs />);
    //     expect(getByTestId(MARQUEE_BLOCK_TEST_ID)).toBeTruthy();
    // });
});
