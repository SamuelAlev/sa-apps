/* (c) Copyright Frontify Ltd., all rights reserved. */

import { describe, expect, it } from 'vitest';
import { withAppBridgeBlockStubs } from '@frontify/app-bridge';
import { render } from '@testing-library/react';

import { AccordionBlock } from '../src/AccordionBlock';

const ACCORDION_BLOCK_TEST_ID = 'accordion-block';

describe('Accordion Block', () => {
    it('renders an accordion block', () => {
        const [AccordionBlockWithStubs] = withAppBridgeBlockStubs(AccordionBlock);
        const { getByTestId } = render(<AccordionBlockWithStubs />);

        expect(getByTestId(ACCORDION_BLOCK_TEST_ID)).toBeTruthy();
    });
});
