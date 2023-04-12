import { ReactElement } from 'react';
import { ScrollArea } from '@sa-apps/scroll-area';
import { useDocumentCategories, useDocumentPages } from '@frontify/app-bridge';

import { useThemeContext } from './Context';

export const Sidebar = (): ReactElement => {
    const { appBridge, context } = useThemeContext();
    const documentId = context.template !== 'cover' ? context.documentId : 0;

    const { getSortedCategories, isLoading: isLoadingDocumentCategories } = useDocumentCategories(
        appBridge,
        documentId
    );
    const {
        getCategorizedPages,
        getUncategorizedPages,
        isLoading: isLoadingDocumentPages,
    } = useDocumentPages(appBridge, documentId);

    const getSortedDocumentCategories = getSortedCategories();
    const uncategorizedDocumentPages = getUncategorizedPages();

    return (
        <aside className="fixed top-14 z-30 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 overflow-y-auto border-r border-r-slate-100 dark:border-r-slate-700 md:sticky md:block">
            <ScrollArea>
                <div className="relative overflow-hidden pr-6 lg:py-10">
                    {getSortedDocumentCategories.map((documentCategory) => (
                        <div key={documentCategory.id} className="pb-6">
                            <h4 className="pb-2 pt-1 px-2 text-sm font-semibold">{documentCategory.title}</h4>
                            <div className="grid grid-flow-row auto-rows-max text-sm">
                                {getCategorizedPages(documentCategory.id).map((documentPage) => (
                                    <a
                                        key={documentPage.id}
                                        className="group flex w-full items-center rounded-md py-1.5 px-2 hover:bg-slate-50 dark:hover:bg-slate-800"
                                        href={`/document/${documentId}#/${documentCategory.slug}/${documentPage.slug}`}
                                    >
                                        {documentPage.title}
                                    </a>
                                ))}
                            </div>
                        </div>
                    ))}

                    {uncategorizedDocumentPages.length > 0 && (
                        <div className="pb-6">
                            {uncategorizedDocumentPages.map((documentPage) => (
                                <a
                                    key={documentPage.id}
                                    className="text-sm group flex w-full items-center rounded-md py-1.5 px-2 hover:bg-slate-50 dark:hover:bg-slate-800"
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
