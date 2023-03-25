/* (c) Copyright Frontify Ltd., all rights reserved. */

import 'tailwindcss/tailwind.css';
import { defineBlock } from '@frontify/guideline-blocks-settings';

import { AccordionBlock as AccordionBlock } from './AccordionBlock';
import { settings } from './settings';

export default defineBlock({
    block: AccordionBlock,
    settings,
});
