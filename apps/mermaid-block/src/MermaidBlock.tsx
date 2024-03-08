import { useAssetUpload, useBlockAssets, useBlockSettings, useEditorState } from '@frontify/app-bridge';
import type { BlockProps } from '@frontify/guideline-blocks-settings';
import { Button } from '@sa-apps/button';
import { useTranslations } from '@sa-apps/i18n';
import { cn } from '@sa-apps/utilities';
import mermaid from 'mermaid';
import { ChangeEvent, type ReactElement, useEffect, useRef, useState } from 'react';
import { borderClasses } from './constants';
import { getMermaidRootStyle } from './helpers';
import { MERMAID_FILE_ID } from './settings';
import { BlockSettings } from './types';
import { useDraggableHeightHandle } from './utilities/useDraggableHeightHandle';

export const MermaidBlock = ({ appBridge }: BlockProps): ReactElement => {
    const { t } = useTranslations();
    const [blockSettings, setBlockSettings] = useBlockSettings<BlockSettings>(appBridge);
    const { blockAssets, updateAssetIdsFromKey } = useBlockAssets(appBridge);
    const isEditing = useEditorState(appBridge);
    const [uploadFile, { results: uploadResults, doneAll }] = useAssetUpload({
        onUploadProgress: () => !loading && setLoading(true),
    });

    const mermaidOutputElementRef = useRef<HTMLPreElement>(null);
    const [code, setCode] = useState(blockSettings.code ?? '');
    const [loading, setLoading] = useState(false);

    const handleInput = (event: ChangeEvent<HTMLTextAreaElement>) => {
        setCode(event.currentTarget.value);
    };

    const handleHeightChange = (height: number) => {
        setBlockSettings({ height: `${height}px` }).catch(() => console.error("Couldn't save the block setttings"));
    };

    const handleMermaidSave = () => {
        if (mermaidOutputElementRef.current) {
            const svg = mermaidOutputElementRef.current.innerHTML;
            const blob = new Blob([svg], { type: 'image/svg+xml' });
            const file = new File([blob], 'mermaid-diagram.svg', { type: 'image/svg+xml' });

            uploadFile(file);

            setBlockSettings({ code });

            setLoading(false);
        }
    };

    useEffect(() => {
        mermaid.initialize({ startOnLoad: false, flowchart: { useMaxWidth: true } });
    }, []);

    useEffect(() => {
        const renderMermaid = async () => {
            if (code && mermaidOutputElementRef.current) {
                mermaidOutputElementRef.current.removeAttribute('data-processed');
                await mermaid.run({ nodes: [mermaidOutputElementRef.current] });
            }
        };

        isEditing && renderMermaid();
    }, [isEditing, code]);

    // biome-ignore lint/correctness/useExhaustiveDependencies: otherwise it goes into an infinite loop
    useEffect(() => {
        if (doneAll) {
            (async (uploadResults) => {
                const assetsId = uploadResults.map((uploadResult) => uploadResult.id);
                await updateAssetIdsFromKey(MERMAID_FILE_ID, assetsId);
                setLoading(false);
            })(uploadResults);
        }
    }, [doneAll, uploadResults]);

    const { height, ResizeHandle, ResizeWrapper } = useDraggableHeightHandle({
        id: 'draggable',
        initialHeight: parseInt(blockSettings.height) ?? 0,
        enabled: isEditing,
        onMouseUp: (height) => handleHeightChange(height),
    });

    return (
        <div data-test-id="mermaid-block" className="flex flex-col gap-6" style={getMermaidRootStyle(blockSettings)}>
            {isEditing ? (
                <>
                    <ResizeWrapper>
                        <pre
                            ref={mermaidOutputElementRef}
                            data-test-id="mermaid-output"
                            style={{ height: `${height}px` }}
                            className={cn('w-full [&>svg]:!max-w-full [&>svg]:h-full aspect-auto', borderClasses)}
                        >
                            {code}
                        </pre>
                        <ResizeHandle />
                    </ResizeWrapper>

                    <h3>Mermaid Code</h3>
                    <textarea rows={10} placeholder={t('enterYourMermaidCode')} className="border" onInput={handleInput} value={code} data-test-id="mermaid-input" />

                    <div className="flex justify-end rtl:justify-start">
                        <Button size="sm" onClick={handleMermaidSave} disabled={loading}>
                            {t('saveCode')}
                        </Button>
                    </div>
                </>
            ) : (
                <div style={{ height: blockSettings.height }} className={cn('w-full flex items-center justify-center', borderClasses)}>
                    <img src={blockAssets[MERMAID_FILE_ID]?.[0]?.genericUrl} alt="Mermaid diagram" className="object-contain h-full w-full" />
                </div>
            )}
        </div>
    );
};
