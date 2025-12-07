export { trackEvent } from "./tracking";
export { withTracking } from "./withTracking";

declare global {
	interface Window {
		umami: {
			track(view_properties?: { website: string; [key: string]: string }): void;
			track(event_name: string, event_data?: { [key: string]: string | number }): void;
			track(
				callback: (props: { data?: { [key: string]: string | number } }) => {
					name?: string;
					website: string;
					data?: { [key: string]: string | number };
				},
			): void;
		};
	}
}
