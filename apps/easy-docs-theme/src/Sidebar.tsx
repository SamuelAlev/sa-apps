import { useCategorizedDocumentPages, useDocumentCategories, useUncategorizedDocumentPages } from '@frontify/app-bridge';
import { ScrollArea } from '@sa-apps/scroll-area';
import type { ReactElement } from 'react';

import { cn } from '@sa-apps/utilities';
import { useThemeContext } from './Context';
import { useCurrentPath } from './hooks/useCurrentPath';

export const Sidebar = (): ReactElement => {
    const { appBridge, context } = useThemeContext();
    const documentId = context.template !== 'cover' ? context.documentId : 0;
    const currentPath = useCurrentPath();

    const { documentCategories } = useDocumentCategories(appBridge, documentId);
    const { documentPages: uncategorizedDocumentPages } = useUncategorizedDocumentPages(appBridge, documentId);

    return (
        <aside className="fixed top-14 z-30 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 overflow-y-auto border-r border-r-border md:sticky md:block">
            <ScrollArea>
                <div className="relative overflow-hidden pr-6 lg:py-10">
                    {documentCategories.map((documentCategory) => (
                        <div key={documentCategory.id} className="pb-6">
                            <h4 className="px-2 pb-2 pt-1 text-sm font-semibold">{documentCategory.title}</h4>
                            <div className="grid grid-flow-row auto-rows-max text-sm">
                                {documentCategories.map((documentCategory) => {
                                    const { documentPages } = useCategorizedDocumentPages(appBridge, documentCategory.id);

                                    return documentPages.map((documentPage) => (
                                        <a
                                            key={documentPage.id}
                                            className={cn(
                                                'group flex w-full items-center rounded-md px-2 py-1.5 text-sm hover:bg-accent',
                                                currentPath === `/document/${documentId}#/${documentCategory.slug}/${documentPage.slug}` && 'bg-accent',
                                            )}
                                            href={`/document/${documentId}#/${documentCategory.slug}/${documentPage.slug}`}
                                        >
                                            {documentPage.title}
                                        </a>
                                    ));
                                })}
                            </div>
                        </div>
                    ))}

                    {uncategorizedDocumentPages.length > 0 && (
                        <div className="pb-6">
                            {uncategorizedDocumentPages.map((documentPage) => (
                                <a
                                    key={documentPage.id}
                                    className={cn(
                                        'group flex w-full items-center rounded-md px-2 py-1.5 text-sm hover:bg-accent',
                                        currentPath === `/document/${documentId}#/${documentPage.slug}` && 'bg-accent',
                                    )}
                                    href={`/document/${documentId}#/${documentPage.slug}`}
                                >
                                    {documentPage.title}
                                </a>
                            ))}
                        </div>
                    )}
                </div>
            </ScrollArea>
        </aside>
    );
};
