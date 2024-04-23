import { defineBlock } from '@frontify/guideline-blocks-settings';
import { withTranslations } from '@sa-apps/i18n';
import { withOnlineUsers } from '@sa-apps/online-users';
import '@sa-apps/tailwind-config/src/styles.scss';
import { withTracking } from '@sa-apps/tracking';

import { TiltImageBlock } from './TiltImageBlock';
import { messages } from './i18n';
import { settings } from './settings';

export default defineBlock({
    block: withTracking('a20326d2-b6cc-4c7b-acb1-3bcf9c504e07')(withOnlineUsers(withTranslations(messages)(TiltImageBlock))),
    settings,
});
