import { defineBlock } from "@frontify/guideline-blocks-settings";
import { withTranslations } from "@sa-apps/i18n";
import { withOnlineUsers } from "@sa-apps/online-users";
import "@sa-apps/tailwind-config/src/styles.scss";
import { withTracking } from "@sa-apps/tracking";
import { messages } from "./i18n";
import { MarqueeBlock } from "./MarqueeBlock";
import { settings } from "./settings";

export default defineBlock({
	block: withTracking("245dc31c-13df-456d-8c1d-18452a38d36d")(withOnlineUsers(withTranslations(messages)(MarqueeBlock))),
	settings,
});
