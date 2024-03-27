import { defineBlock } from '@frontify/guideline-blocks-settings';
import { withTranslations } from '@sa-apps/i18n';
import '@sa-apps/tailwind-config/src/styles.scss';
import { withTracking } from '@sa-apps/tracking';

import { MarqueeBlock } from './MarqueeBlock';
import { messages } from './i18n';
import { settings } from './settings';

export default defineBlock({
    block: withTracking('245dc31c-13df-456d-8c1d-18452a38d36d')(withTranslations(messages)(MarqueeBlock)),
    settings,
});
