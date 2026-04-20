import { sendEvent } from "./withTracking";

export const trackEvent = (eventName: string, data: Record<string, string | number> = {}) => {
	sendEvent(eventName, data);
};
