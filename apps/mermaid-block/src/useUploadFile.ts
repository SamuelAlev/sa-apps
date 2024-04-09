import { useAssetUpload } from '@frontify/app-bridge';
import { useEffect, useState } from 'react';

// Have to pass the function as an argument because it also update the block assets state.
export const useUploadFile = (callback: (assetId: number) => Promise<void>) => {
    const [loading, setLoading] = useState(false);

    const [uploadFileFromBridge, { results: uploadResults, doneAll }] = useAssetUpload();

    // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
    useEffect(() => {
        if (doneAll) {
            (async (uploadResults) => {
                const assetIds = uploadResults.map((uploadResult) => uploadResult.id);
                await callback(assetIds[0]);
                setLoading(false);
            })(uploadResults);
        }
    }, [doneAll, uploadResults]);

    const uploadFile = (files: File | FileList) => {
        setLoading(true);
        uploadFileFromBridge(files);
    };

    return { uploadFile, loading };
};
