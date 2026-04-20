import "@sa-apps/tailwind-config/src/styles.scss";

import { defineBlock } from "@frontify/guideline-blocks-settings";
import { withTranslations } from "@sa-apps/i18n";
import { withTracking } from "@sa-apps/tracking";
import { messages } from "./i18n";
import { StackableImagesBlock } from "./StackableImagesBlock";
import { settings } from "./settings";

export default defineBlock({
	block: withTracking("stackable-images")(withTranslations(messages)(StackableImagesBlock)),
	settings,
});
