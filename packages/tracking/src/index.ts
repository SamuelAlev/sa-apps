export { withTracking } from './withTracking';
export { trackEvent } from './tracking';

declare global {
    interface Window {
        umami: {
            track(view_properties?: { website: string; [key: string]: string }): void;
            track(event_name: string, event_data?: { [key: string]: string | number }): void;
        };
    }
}
