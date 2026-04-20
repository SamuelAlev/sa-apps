import "@sa-apps/tailwind-config/src/styles.scss";

import { defineBlock } from "@frontify/guideline-blocks-settings";
import { withTranslations } from "@sa-apps/i18n";
import { withTracking } from "@sa-apps/tracking";
import "./styles.scss";

import { messages } from "./i18n";
import { MermaidBlock } from "./MermaidBlock";
import { settings } from "./settings";

export default defineBlock({
	block: withTracking("f28a615b-dadc-424b-98d1-140660a33134")(withTranslations(messages)(MermaidBlock)),
	settings,
});
