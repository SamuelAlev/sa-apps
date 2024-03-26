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
                component: withTracking('582f38ce-d4bd-4715-9a10-8ac13dbb9af0')(withTranslations(messages)(EasyDocsTheme)),
                settings,
            },
        },
        documentPage: {
            default: {
                component: withTracking('582f38ce-d4bd-4715-9a10-8ac13dbb9af0')(withTranslations(messages)(EasyDocsTheme)),
                settings,
            },
        },
        library: {
            default: {
                component: withTracking('582f38ce-d4bd-4715-9a10-8ac13dbb9af0')(withTranslations(messages)(EasyDocsTheme)),
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
