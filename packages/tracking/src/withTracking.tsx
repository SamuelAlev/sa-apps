import type { ComponentType, FC, ReactElement } from 'react';
import { useEffect } from 'react';
import { clarity } from 'clarity-js';

export const withTracking =
    (id: string) =>
    <P extends object>(Component: ComponentType<P>): FC<P> => {
        return function withTracking(props): ReactElement {
            // eslint-disable-next-line react-hooks/rules-of-hooks
            useEffect(() => {
                const initTracking = () => {
                    try {
                        clarity.start({ projectId: id });
                    } catch {
                        // Do nothing
                    }
                };

                import.meta.env.PROD && initTracking();
            }, []);

            return <Component {...props} />;
        };
    };
