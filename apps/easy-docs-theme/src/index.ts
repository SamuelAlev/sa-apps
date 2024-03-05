import { defineTheme } from '@frontify/guideline-themes';
import { withTranslations } from '@sa-apps/i18n';
import '@sa-apps/tailwind-config/src/styles.scss';
import { withTracking } from '@sa-apps/tracking';
import './styles.scss';

import { EasyDocsTheme } from './EasyDocsTheme';
import { messages } from './i18n';
import { settings } from './settings';

export default defineTheme({
    templates: {
        cover: {
            default: {
                component: withTracking('c7a25632-ffb8-4b71-abf8-6f8ebfa09fce')(withTranslations(messages)(EasyDocsTheme)),
                settings,
            },
        },
        documentPage: {
            default: {
                component: withTracking('c7a25632-ffb8-4b71-abf8-6f8ebfa09fce')(withTranslations(messages)(EasyDocsTheme)),
                settings,
            },
        },
        library: {
            default: {
                component: withTracking('c7a25632-ffb8-4b71-abf8-6f8ebfa09fce')(withTranslations(messages)(EasyDocsTheme)),
                settings,
            },
        },
    },
    settings: {
        cover: {},
        documentPage: {},
        library: {},
    },
});
