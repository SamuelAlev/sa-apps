import 'tailwindcss/tailwind.css';
import { defineBlock } from '@frontify/guideline-blocks-settings';
import { withTranslations } from '@sa-apps/i18n';

import { MasonryBlock } from './MasonryBlock';
import { settings } from './settings';
import { messages } from './i18n';

export default defineBlock({
    block: withTranslations(messages)(MasonryBlock),
    settings,
});
