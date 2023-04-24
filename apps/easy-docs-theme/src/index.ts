import '@sa-apps/tailwind-config/styles';
import './styles.scss';
import { defineTheme } from '@frontify/guideline-themes';
import { withTranslations } from '@sa-apps/i18n';
import { withTracking } from '@sa-apps/tracking';

import { EasyDocsTheme } from './EasyDocsTheme';
import { settings } from './settings';
import { messages } from './i18n';

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
