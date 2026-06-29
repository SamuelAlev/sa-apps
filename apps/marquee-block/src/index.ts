import "@sa-apps/design-system/styles";

import { defineBlock } from "@frontify/guideline-blocks-settings";
import { withTranslations } from "@sa-apps/i18n";
import { withTracking } from "@sa-apps/tracking";
import { messages } from "./i18n";
import { MarqueeBlock } from "./MarqueeBlock";
import { settings } from "./settings";

export default defineBlock({
	block: withTracking("marquee")(withTranslations(messages)(MarqueeBlock)),
	settings,
});
