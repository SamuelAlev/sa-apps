import "@sa-apps/tailwind-config/src/styles.scss";

import { defineBlock } from "@frontify/guideline-blocks-settings";
import { withTranslations } from "@sa-apps/i18n";
import { withTracking } from "@sa-apps/tracking";
import { messages } from "./i18n";
import { MasonryBlock } from "./MasonryBlock";
import { settings } from "./settings";

export default defineBlock({
	block: withTracking("3afa73ed-5af0-4d9b-8a90-a2869d7ef7ec")(withTranslations(messages)(MasonryBlock)),
	settings,
});
