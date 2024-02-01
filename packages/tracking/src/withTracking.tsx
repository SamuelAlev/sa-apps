import { clarity } from 'clarity-js';
import type { ComponentType, FC, ReactElement } from 'react';
import { useEffect } from 'react';

export const withTracking =
    (id: string) =>
    <P extends object>(Component: ComponentType<P>): FC<P> => {
        return function withTracking(props): ReactElement {
            // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
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
