export const trackEvent = (eventName: string, data: Record<string, string | number> = {}) => {
    window.umami.track(eventName, data);
};
