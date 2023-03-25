/* (c) Copyright Frontify Ltd., all rights reserved. */

import { describe, it, expect } from 'vitest';
import { withAppBridgeBlockStubs } from '@frontify/app-bridge';
import { AccordionBlock } from './AccordionBlock';

const AccordionBlockSelector = '[data-test-id="example-block"]';

describe('Accordion Block', () => {
    it('renders an accordion block', () => {
        const [AccordionBlockWithStubs] = withAppBridgeBlockStubs(AccordionBlock);
    });
});
