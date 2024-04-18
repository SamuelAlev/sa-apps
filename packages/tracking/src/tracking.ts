import { WEBSITE_ID_DEV, store } from './withTracking';

export const trackEvent = (eventName: string, data: Record<string, string | number> = {}) => {
    window.umami?.track((props) => ({
        ...props,
        name: eventName,
        website: import.meta.env.PROD ? store.websiteId : WEBSITE_ID_DEV,
        data: {
            ...props.data,
            ...data,
        },
    }));
};
