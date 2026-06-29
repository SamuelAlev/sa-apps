import "@sa-apps/design-system/styles";

import { defineBlock } from "@frontify/guideline-blocks-settings";
import { withTranslations } from "@sa-apps/i18n";
import { withTracking } from "@sa-apps/tracking";
import { messages } from "./i18n";
import { MasonryBlock } from "./MasonryBlock";
import { settings } from "./settings";

export default defineBlock({
	block: withTracking("masonry")(withTranslations(messages)(MasonryBlock)),
	settings,
});
