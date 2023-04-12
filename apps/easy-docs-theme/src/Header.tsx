import { MouseEvent, ReactElement } from 'react';
import { Button } from '@sa-apps/button';
import { Laptop, Moon, Sun } from 'lucide-react';
import { useTranslations } from '@sa-apps/i18n';
import { CoverPage, useCoverPage, useDocuments, useEditorState } from '@frontify/app-bridge';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@sa-apps/dropdown-menu';

import { useThemeMode } from './hooks';
import { useThemeContext } from './Context';

export const shouldShowCoverPage = (coverPage: CoverPage, isEditing: boolean): boolean => {
    return (!coverPage.hideInNav && !coverPage.draft) || isEditing;
};

export const Header = (): ReactElement => {
    const { t } = useTranslations();
    const [isDark, setThemeMode] = useThemeMode();
    const { appBridge, router } = useThemeContext();
    //TODO
    // const { documentGroups } = useDocumentGroups(appBridge);
    const { getUngroupedDocuments } = useDocuments(appBridge);
    const { coverPage, isLoading } = useCoverPage(appBridge);
    const isEditing = useEditorState(appBridge);

    // const documentsAndGroups = useMemo(
    //     () =>
    //         [...getUngroupedDocuments(), ...documentGroups.values()].sort((a, b) =>
    //             a.sort && b.sort ? a.sort - b.sort : 0
    //         ),
    //     [documentGroups, getUngroupedDocuments]
    // );
    const documents = getUngroupedDocuments();

    const handleAnchorElementClick = (event: MouseEvent<HTMLAnchorElement>) => {
        event.preventDefault();
        router.navigate(event.currentTarget.getAttribute('href') ?? '');
    };

    return (
        <header className="sticky z-40 w-full border-b border-b-slate-200 bg-white dark:border-b-slate-700 dark:bg-slate-900">
            <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
                <div className="flex gap-6 md:gap-10">
                    <nav className="flex items-center space-x-6 text-sm font-semibold">
                        {!isLoading && coverPage && shouldShowCoverPage(coverPage, isEditing) && (
                            <a
                                href={coverPage.url}
                                onClick={handleAnchorElementClick}
                                title={coverPage.title}
                                aria-label={coverPage.title}
                            >
                                {coverPage.title}
                            </a>
                        )}

                        {documents.map((document) => (
                            <a
                                key={document.id}
                                href={`/document/${document.id}`}
                                onClick={handleAnchorElementClick}
                                title={document.title}
                                aria-label={document.title}
                            >
                                {document.title}
                            </a>
                        ))}
                    </nav>
                </div>
                <div className="flex flex-1 items-center space-x-4 sm:justify-end">
                    <DropdownMenu>
                        <DropdownMenuTrigger>
                            <Button
                                size="sm"
                                variant="ghost"
                                title={t('toggleModeMenu')}
                                aria-label={t('toggleModeMenu')}
                            >
                                {isDark ? <Moon /> : <Sun />}
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => setThemeMode('light')}>
                                <Sun className="mr-2 h-4 w-4" />
                                {t('light')}
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => setThemeMode('dark')}>
                                <Moon className="mr-2 h-4 w-4" />
                                {t('dark')}
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => setThemeMode('system')}>
                                <Laptop className="mr-2 h-4 w-4" />
                                {t('system')}
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
        </header>
    );
};
