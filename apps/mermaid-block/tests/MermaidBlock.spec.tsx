import { withAppBridgeBlockStubs } from '@frontify/app-bridge';
import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { MermaidBlock } from '../src/MermaidBlock';

const MERMAID_BLOCK_TEST_ID = 'mermaid-block';

describe.skip('Mermaid Block', () => {
    // it('renders the block', () => {
    //     const [MermaidBlockWithStubs] = withAppBridgeBlockStubs(MermaidBlock);
    //     const { getByTestId } = render(<MermaidBlockWithStubs />);
    //     expect(getByTestId(MERMAID_BLOCK_TEST_ID)).toBeTruthy();
    // });
});
