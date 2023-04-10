import 'tailwindcss/tailwind.css';
import { defineBlock } from '@frontify/guideline-blocks-settings';
import { withTranslations } from '@sa-apps/i18n';
import { withTracking } from '@sa-apps/tracking';

import { AccordionBlock } from './AccordionBlock';
import { settings } from './settings';
import { messages } from './i18n';

export default defineBlock({
    block: withTracking('gmjf13ophj')(withTranslations(messages)(AccordionBlock)),
    settings,
});
