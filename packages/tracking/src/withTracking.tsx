import { ComponentType, FC, ReactElement, useEffect } from 'react';

import { init } from './tracking';

export const withTracking =
    (id: string) =>
    <P extends object>(Component: ComponentType<P>): FC<P> => {
        return function withTracking(props): ReactElement {
            // eslint-disable-next-line react-hooks/rules-of-hooks
            useEffect(() => {
                const initTracking = async () => {
                    try {
                        await init(id);
                    } catch {
                        // Do nothing
                    }
                };

                import.meta.env.PROD && initTracking();
            }, []);

            return <Component {...(props as P)} />;
        };
    };
