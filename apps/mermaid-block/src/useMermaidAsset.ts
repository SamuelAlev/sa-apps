import type { useBlockAssets } from '@frontify/app-bridge';
import { useEffect, useState } from 'react';
import { MERMAID_FILE_ID } from './settings';

type BlockAssets = ReturnType<typeof useBlockAssets>['blockAssets'];

export const useMermaidAsset = (blockAssets: BlockAssets): string | null => {
    const [mermaidSvgAsset, setMermaidSvgAsset] = useState<string | null>(null);

    useEffect(() => {
        const fetchMermaidAsset = async () => {
            if (blockAssets[MERMAID_FILE_ID]?.[0]) {
                const response = await fetch(blockAssets[MERMAID_FILE_ID][0].genericUrl);
                const svg = await response.text();

                setMermaidSvgAsset(svg);
            }
        };

        fetchMermaidAsset();
    }, [blockAssets[MERMAID_FILE_ID]]);

    return mermaidSvgAsset;
};
