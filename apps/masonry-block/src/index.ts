import '@sa-apps/tailwind-config/styles';
import { defineBlock } from '@frontify/guideline-blocks-settings';
import { withTranslations } from '@sa-apps/i18n';
import { withTracking } from '@sa-apps/tracking';

import { MasonryBlock } from './MasonryBlock';
import { settings } from './settings';
import { messages } from './i18n';

export default defineBlock({
    block: withTracking('gmjf13ophj')(withTranslations(messages)(MasonryBlock)),
    settings,
});
