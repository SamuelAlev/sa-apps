import "@sa-apps/tailwind-config/src/styles.scss";

import { defineBlock } from "@frontify/guideline-blocks-settings";
import { withTranslations } from "@sa-apps/i18n";
import { withTracking } from "@sa-apps/tracking";
import { messages } from "./i18n";
import { MarqueeBlock } from "./MarqueeBlock";
import { settings } from "./settings";

export default defineBlock({
	block: withTracking("e5ecb63e-5a2d-4958-9191-473078336236")(withTranslations(messages)(MarqueeBlock)),
	settings,
});
