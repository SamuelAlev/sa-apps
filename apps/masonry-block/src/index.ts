import { defineBlock } from "@frontify/guideline-blocks-settings";
import { withTranslations } from "@sa-apps/i18n";
import { withOnlineUsers } from "@sa-apps/online-users";
import "@sa-apps/tailwind-config/src/styles.scss";
import { withTracking } from "@sa-apps/tracking";
import { messages } from "./i18n";
import { MasonryBlock } from "./MasonryBlock";
import { settings } from "./settings";

export default defineBlock({
	block: withTracking("f8d3dfeb-0507-4514-95ac-37deba606200")(withOnlineUsers(withTranslations(messages)(MasonryBlock))),
	settings,
});
