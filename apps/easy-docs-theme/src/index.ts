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
                component: withTracking('gmjf13ophj')(withTranslations(messages)(EasyDocsTheme)),
                settings,
            },
        },
        documentPage: {
            default: {
                component: withTracking('gmjf13ophj')(withTranslations(messages)(EasyDocsTheme)),
                settings,
            },
        },
        library: {
            default: {
                component: withTracking('gmjf13ophj')(withTranslations(messages)(EasyDocsTheme)),
                settings,
            },
        },
    },
});
