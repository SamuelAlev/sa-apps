import { defineBlock } from '@frontify/guideline-blocks-settings';
import { withTranslations } from '@sa-apps/i18n';
import '@sa-apps/tailwind-config/src/styles.scss';
import { withTracking } from '@sa-apps/tracking';

import { AccordionBlock } from './AccordionBlock';
import { messages } from './i18n';
import { settings } from './settings';

export default defineBlock({
    block: withTracking('32c00ef3-3595-4b6c-8c5f-44034e1b3608')(withTranslations(messages)(AccordionBlock)),
    settings,
});
