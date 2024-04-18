import { useBlockAssets, useBlockSettings, useEditorState } from '@frontify/app-bridge';
import type { BlockProps } from '@frontify/guideline-blocks-settings';
import { useBlockFocus } from '@sa-apps/blocks';
import { Button } from '@sa-apps/button';
import { useTranslations } from '@sa-apps/i18n';
import { OnlineUsersProvider } from '@sa-apps/online-users';
import { trackEvent } from '@sa-apps/tracking';
import { cn } from '@sa-apps/utilities';
import { Loader2 } from 'lucide-react';
import type mermaid from 'mermaid';
import { type FormEventHandler, type ReactElement, useEffect, useRef, useState } from 'react';

import packageJson from '../package.json';

import { borderClasses } from './constants';
import { getMermaidRootStyle } from './helpers';
import { MERMAID_FILE_ID } from './settings';
import type { BlockSettings } from './types';
import { useMermaidAsset } from './useMermaidAsset';
import { usePrettyCode } from './usePrettyCode';
import { useUploadFile } from './useUploadFile';
import { useDraggableHeightHandle } from './utilities/useDraggableHeightHandle';

export const MermaidBlock = ({ appBridge }: BlockProps): ReactElement => {
    const { t } = useTranslations();
    const [blockSettings, setBlockSettings] = useBlockSettings<BlockSettings>(appBridge);
    const { blockAssets, updateAssetIdsFromKey } = useBlockAssets(appBridge);
    const isEditing = useEditorState(appBridge);

    const mermaidImport = useRef<typeof mermaid | null>(null);
    const mermaidInputElementRef = useRef<HTMLTextAreaElement>(null);
    const mermaidOutputElementRef = useRef<HTMLPreElement>(null);
    const [showCode, setShowCode] = useState(false);

    const { uploadFile, loading } = useUploadFile((assetId) => updateAssetIdsFromKey(MERMAID_FILE_ID, [assetId]));
    const prettyCode = usePrettyCode(blockSettings.code ?? '');
    const mermaidSvgAsset = useMermaidAsset(blockAssets);

    const isBlockFocused = useBlockFocus(appBridge);
    const roomName = `mermaid-block-${appBridge.context('blockId').get()}`;

    const handleHeightChange = (height: number) => {
        setBlockSettings({ height: `${height}px` }).catch(() => console.error("Couldn't save the block setttings"));
        trackEvent('changed height');
    };

    const handleMermaidSave: FormEventHandler<HTMLFormElement> = (event) => {
        event.preventDefault();

        const form = event.target as HTMLFormElement;
        const formData = new FormData(form);
        const formObject = Object.fromEntries(formData.entries());
        const mermaidCode = formObject['mermaid-code'];
        if (typeof mermaidCode !== 'string') {
            throw new Error('Expected the form textarea value to be a string');
        }

        if (mermaidOutputElementRef.current) {
            const svg = mermaidOutputElementRef.current.innerHTML;
            const blob = new Blob([svg], { type: 'image/svg+xml' });
            const file = new File([blob], 'mermaid-diagram.svg', { type: 'image/svg+xml' });

            uploadFile(file);

            setBlockSettings({ code: mermaidCode });

            trackEvent('saved code');
        }
    };

    const handleShowCode = () => {
        setShowCode((showCode) => !showCode);
        trackEvent('toggled code', { value: `${showCode}` });
    };

    const renderMermaid = async () => {
        mermaidImport.current ??= await import(/* @vite-ignore */ `https://esm.sh/mermaid@${packageJson.dependencies.mermaid}`).then((mod) => mod.default);
        if (mermaidImport.current && mermaidOutputElementRef.current && mermaidInputElementRef.current) {
            mermaidOutputElementRef.current.removeAttribute('data-processed');
            mermaidOutputElementRef.current.textContent = mermaidInputElementRef.current.value;
            await mermaidImport.current.run({ nodes: [mermaidOutputElementRef.current] });
        }
    };

    const { height, ResizeHandle, ResizeWrapper } = useDraggableHeightHandle({
        id: 'draggable',
        initialHeight: Number.parseInt(blockSettings.height) ?? 0,
        enabled: isEditing,
        onMouseUp: (height) => handleHeightChange(height),
    });

    useEffect(() => {
        isEditing && renderMermaid();
    }, [isEditing, renderMermaid]);

    return (
        <OnlineUsersProvider
            visible={isEditing}
            isUserVisible={isBlockFocused}
            roomName={roomName}
            // @ts-expect-error the hook makes a fetch request :(
            user={{ name: window.application.sandbox.config.context.user.name, avatar: window.application.sandbox.config.context.user.preview_url_without_placeholder }}
        >
            <div data-test-id="mermaid-block" className="mermaid-block w-full flex flex-col gap-6" style={getMermaidRootStyle(blockSettings)}>
                {isEditing ? (
                    <>
                        <ResizeWrapper>
                            <div className="relative">
                                <pre
                                    ref={mermaidOutputElementRef}
                                    data-test-id="mermaid-output"
                                    style={{ height: `${height}px` }}
                                    className={cn('h-full w-full [&>svg]:!max-w-full [&>svg]:!w-full [&>svg]:h-full aspect-auto', borderClasses, loading && 'blur-sm grayscale')}
                                />

                                {loading && (
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <Loader2 className="animate-spin text-white" size={32} />
                                    </div>
                                )}
                            </div>
                            <ResizeHandle />
                        </ResizeWrapper>

                        <form className="px-6 flex flex-col gap-6" onSubmit={handleMermaidSave}>
                            <h3>Mermaid Code</h3>
                            <textarea
                                name="mermaid-code"
                                ref={mermaidInputElementRef}
                                defaultValue={blockSettings.code}
                                rows={10}
                                placeholder={t('enterYourMermaidCode')}
                                className="border rounded px-2 py-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                                style={{ fontFamily: "'JetBrains Mono', monospace" }}
                                data-test-id="mermaid-code"
                                onInput={renderMermaid}
                            />

                            <div className="flex justify-end rtl:justify-start">
                                <Button size="sm" type="submit" disabled={loading}>
                                    {t('saveCode')}
                                </Button>
                            </div>
                        </form>
                    </>
                ) : mermaidSvgAsset && blockAssets[MERMAID_FILE_ID]?.[0] ? (
                    <div className="flex flex-col w-full group" data-show-code={blockSettings.alwaysShowCode || showCode}>
                        <div style={{ height: blockSettings.height }} className={cn('relative w-full flex items-center justify-center', borderClasses)}>
                            <div
                                className="h-full w-full [&>svg]:!max-w-full [&>svg]:!w-full [&>svg]:h-full aspect-auto"
                                // biome-ignore lint/security/noDangerouslySetInnerHtml: data generated by mermaid and saved as SVG
                                dangerouslySetInnerHTML={{ __html: mermaidSvgAsset }}
                            />

                            {!blockSettings.alwaysShowCode && blockSettings.displayShowCodeButton && (
                                <div className="absolute bottom-0 right-0 p-2 bg-white bg-opacity-50">
                                    <Button size="sm" onClick={handleShowCode}>
                                        {showCode ? t('hideCode') : t('showCode')}
                                    </Button>
                                </div>
                            )}
                        </div>

                        <div
                            className="overflow-hidden h-full max-h-0 group-data-[show-code=true]:max-h-[100dvh] transition-[max-height]"
                            // biome-ignore lint/security/noDangerouslySetInnerHtml: data generated by mermaid and rendered by shiki
                            dangerouslySetInnerHTML={{ __html: prettyCode }}
                        />
                    </div>
                ) : null}
            </div>
        </OnlineUsersProvider>
    );
};
