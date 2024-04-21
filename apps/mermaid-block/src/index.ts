import { defineBlock } from '@frontify/guideline-blocks-settings';
import { withTranslations } from '@sa-apps/i18n';
import { withOnlineUsers } from '@sa-apps/online-users';
import '@sa-apps/tailwind-config/src/styles.scss';
import { withTracking } from '@sa-apps/tracking';
import './styles.scss';

import { MermaidBlock } from './MermaidBlock';
import { messages } from './i18n';
import { settings } from './settings';

export default defineBlock({
    block: withTracking('c7a25632-ffb8-4b71-abf8-6f8ebfa09fce')(withOnlineUsers(withTranslations(messages)(MermaidBlock))),
    settings,
});
