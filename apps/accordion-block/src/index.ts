import "@sa-apps/tailwind-config/src/styles.scss";

import { defineBlock } from "@frontify/guideline-blocks-settings";
import { withTranslations } from "@sa-apps/i18n";
import { withTracking } from "@sa-apps/tracking";

import { AccordionBlock } from "./AccordionBlock";
import { messages } from "./i18n";
import { settings } from "./settings";

export default defineBlock({
	block: withTracking("9dbf0769-8fb0-4636-8924-04e4e9d09382")(withTranslations(messages)(AccordionBlock)),
	settings,
});
