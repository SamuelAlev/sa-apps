import "@sa-apps/tailwind-config/src/styles.scss";
import "./styles.scss";

import { defineTheme } from "@frontify/guideline-themes";
import { withTranslations } from "@sa-apps/i18n";
import { withTracking } from "@sa-apps/tracking";

import { EasyDocsTheme } from "./EasyDocsTheme";
import { messages } from "./i18n";
import { settings } from "./settings";

export default defineTheme({
	templates: {
		cover: {
			default: {
				component: withTracking("easy-docs")(withTranslations(messages)(EasyDocsTheme)),
				settings,
			},
		},
		documentPage: {
			default: {
				component: withTracking("easy-docs")(withTranslations(messages)(EasyDocsTheme)),
				settings,
			},
		},
		library: {
			default: {
				component: withTracking("easy-docs")(withTranslations(messages)(EasyDocsTheme)),
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
