import { type AppBridgeBlock } from '@frontify/app-bridge';
import { useEffect, useState } from 'react';

export const useBlockFocus = (appBridge: AppBridgeBlock) => {
    const blockId = appBridge.context('blockId').get();
    const [hash, setHash] = useState<string>(window.location.hash);

    useEffect(() => {
        const handleHashChange = () => {
            setHash(window.location.hash);
        };

        window.addEventListener('hashchange', handleHashChange);
        return () => {
            window.removeEventListener('hashchange', handleHashChange);
        };
    }, []);

    return hash.endsWith(blockId.toString());
};
