// Copied from https://raw.githubusercontent.com/Frontify/brand-sdk/main/packages/app-bridge/src/react/useBlockAssets.ts
// Added support for options `{ enabled: boolean }` to enable/disable the auto fetch.

import { type AppBridgeBlock, type Asset, compareObjects } from '@frontify/app-bridge';
import { useEffect, useState } from 'react';

export const useBlockAssets = (appBridge: AppBridgeBlock, options?: { enabled?: boolean }) => {
    const blockId = appBridge.context('blockId').get();

    const [blockAssets, setBlockAssets] = useState<Record<string, Asset[]>>({});

    const updateBlockAssetsFromEvent = (event: {
        blockId: number;
        blockAssets: Record<string, Asset[]>;
        prevBlockAssets: Record<string, Asset[]>;
    }) => {
        if (event.blockId === blockId && !compareObjects(event.blockAssets, event.prevBlockAssets)) {
            setBlockAssets(event.blockAssets);
        }
    };

    // Fetch the block assets on mount.
    // And add listener for block assets updates.
    // biome-ignore lint/correctness/useExhaustiveDependencies: from sdk
    useEffect(() => {
        let componentMounted = true;

        if (blockId && options?.enabled) {
            const mountingFetch = async () => {
                const allBlockAssets = await appBridge.getBlockAssets();
                if (componentMounted) {
                    setBlockAssets(allBlockAssets);
                }
            };
            mountingFetch();

            // @ts-expect-error From sdk
            window.emitter.on('AppBridge:BlockAssetsUpdated', updateBlockAssetsFromEvent);
        }

        return () => {
            componentMounted = false;
            // @ts-expect-error From sdk
            window.emitter.off('AppBridge:BlockAssetsUpdated', updateBlockAssetsFromEvent);
        };
    }, [appBridge, options?.enabled]);

    const emitUpdatedBlockAssets = async () => {
        // @ts-expect-error From sdk
        window.emitter.emit('AppBridge:BlockAssetsUpdated', {
            blockId,
            blockAssets: await appBridge.getBlockAssets(),
            prevBlockAssets: { ...blockAssets },
        });
    };

    const updateAssetIdsFromKey = async (key: string, newAssetIds: number[]) => {
        try {
            await appBridge.api({ name: 'setAssetIdsByBlockAssetKey', payload: { key, assetIds: newAssetIds } });
        } catch (error) {
            console.error(error);
        }
        emitUpdatedBlockAssets();
    };

    const deleteAssetIdsFromKey = async (key: string, assetIds: number[]) => {
        await appBridge.deleteAssetIdsFromBlockAssetKey(key, assetIds);
        emitUpdatedBlockAssets();
    };

    const addAssetIdsToKey = async (key: string, assetIds: number[]) => {
        await appBridge.addAssetIdsToBlockAssetKey(key, assetIds);
        emitUpdatedBlockAssets();
    };

    return {
        blockAssets,
        addAssetIdsToKey,
        deleteAssetIdsFromKey,
        updateAssetIdsFromKey,
    };
};
