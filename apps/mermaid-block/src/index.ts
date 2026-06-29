import "@sa-apps/design-system/styles";

import { defineBlock } from "@frontify/guideline-blocks-settings";
import { withTranslations } from "@sa-apps/i18n";
import { withTracking } from "@sa-apps/tracking";
import "./styles.scss";

import { messages } from "./i18n";
import { MermaidBlock } from "./MermaidBlock";
import { settings } from "./settings";

export default defineBlock({
	block: withTracking("mermaid")(withTranslations(messages)(MermaidBlock)),
	settings,
});
