import type { ComponentType, FC, ReactElement } from 'react';
import { useEffect } from 'react';

const WEBSITE_ID_DEV = '32c00ef3-3595-4b6c-8c5f-44034e1b3608';

export const withTracking =
    (websiteId: string) =>
    <P extends object>(Component: ComponentType<P>): FC<P> => {
        return function withTracking(props): ReactElement {
            useEffect(() => {
                const initTracking = () => {
                    const script = document.createElement('script');
                    script.setAttribute('src', 'https://analytics.alev.dev/script.js');
                    script.setAttribute('data-website-id', import.meta.env.PROD ? websiteId : WEBSITE_ID_DEV);
                    script.setAttribute('defer', 'true');

                    document.body.appendChild(script);
                };

                initTracking();

                return () => {
                    const script = document.querySelector(`[src="https://analytics.alev.dev/script.js"][data-website-id="${websiteId}"]`);
                    script?.remove();
                };
            }, [websiteId]);

            return <Component {...props} />;
        };
    };
