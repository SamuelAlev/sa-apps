import "@sa-apps/tailwind-config/src/styles.scss";

import { defineBlock } from "@frontify/guideline-blocks-settings";
import { withTranslations } from "@sa-apps/i18n";
import { withTracking } from "@sa-apps/tracking";
import { messages } from "./i18n";
import { StackableImagesBlock } from "./StackableImagesBlock";
import { settings } from "./settings";

export default defineBlock({
	block: withTracking("d31d990d-df4d-455d-8489-008a1ee1a2ed")(withTranslations(messages)(StackableImagesBlock)),
	settings,
});
