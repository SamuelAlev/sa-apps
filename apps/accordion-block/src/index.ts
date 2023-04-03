import 'tailwindcss/tailwind.css';
import { defineBlock } from '@frontify/guideline-blocks-settings';
import { withTranslations } from '@sa-apps/shared';

import { AccordionBlock as AccordionBlock } from './AccordionBlock';
import { settings } from './settings';
import { messages } from './i18n';

export default defineBlock({
    block: withTranslations(messages)(AccordionBlock),
    settings,
});
