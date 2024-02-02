import type { CoverPage, Document, DocumentGroup } from '@frontify/app-bridge';
import { useCoverPage, useDocumentGroups, useEditorState, useGroupedDocuments, useUngroupedDocuments } from '@frontify/app-bridge';
import sdk from '@sa-apps/api';
import { Avatar, AvatarFallback, AvatarImage } from '@sa-apps/avatar';
import { Button, buttonVariants } from '@sa-apps/button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@sa-apps/collapsible';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@sa-apps/dropdown-menu';
import { useTranslations } from '@sa-apps/i18n';
import { cn } from '@sa-apps/utilities';
import { ChevronDown, Laptop, LogOut, Menu, Moon, Sun, X } from 'lucide-react';
import type { MouseEvent, ReactElement } from 'react';
import { useMemo, useState } from 'react';

import { useThemeContext } from './Context';
import { Search } from './Search';
import { getLinkFromLanguage } from './helpers/language';
import { useThemeMode } from './hooks/useThemeMode';
import { isDocumentGroup } from './helpers/types';

type HeaderDocumentOrDocumentGroupProps = {
    documentOrDocumentGroup: Document | DocumentGroup;
    onLinkClick: (event: MouseEvent<HTMLAnchorElement>) => void;
};

type HeaderDocumentOrLinkProps = {
    documentOrLink: Document;
    onLinkClick: (event: MouseEvent<HTMLAnchorElement>) => void;
};

export const shouldShowCoverPage = (coverPage: CoverPage, isEditing: boolean): boolean => {
    return (!coverPage.hideInNav && !coverPage.draft) || isEditing;
};

export const Header = (): ReactElement => {
    const { t } = useTranslations();
    const [isDark, setThemeMode] = useThemeMode();
    const { appBridge, router } = useThemeContext();
    const { documentGroups } = useDocumentGroups(appBridge);
    const { documents: ungroupedDocuments } = useUngroupedDocuments(appBridge);
    const { coverPage, isLoading } = useCoverPage(appBridge);
    const isEditing = useEditorState(appBridge);
    const [showMobileMenu, setShowMobileMenu] = useState<boolean>(false);

    const portalId = appBridge.context('portalId').get();
    const isLoggedIn = window.application.sandbox.config.context.authenticated;

    const { data: dataCurrentUser, isLoading: isLoadingCurrentUser, error: errorCurrentUser } = sdk.useCurrentUser(isLoggedIn ? 'currentUser' : null, undefined);

    const { data: dataPortal, isLoading: isLoadingPortal, error: errorPortal } = sdk.usePortal(isLoggedIn ? `portal-${portalId}` : null, { portalId });

    const documentsAndGroups = useMemo(
        () => [...ungroupedDocuments, ...documentGroups.values()].sort((a, b) => (a.sort && b.sort ? a.sort - b.sort : 0)),
        [documentGroups, ungroupedDocuments],
    );

    const handleAnchorElementClick = (event: MouseEvent<HTMLAnchorElement>) => {
        const anchorElement = event.currentTarget;
        if (anchorElement.href.startsWith('/') || anchorElement.href.startsWith(window.location.origin)) {
            event.preventDefault();
            router.navigate(anchorElement.href.replace(window.location.origin, '') ?? '');
        }
    };

    const handleLogInClick = () => {
        window.location.href = `/auth/?referer=${encodeURIComponent(window.location.href.replace(window.location.origin, ''))}`;
    };

    const handleLogOutClick = () => {
        window.location.href = '/api/user/logout';
    };

    const handleLanguageClick = (event: MouseEvent, language: string) => {
        event.preventDefault();
        alert('Language switcher is not yet implemented 🥲');
        window.location.href = getLinkFromLanguage(language);
    };

    return (
        <header className="sticky z-40 w-full border-b border-b-border bg-background/80">
            <div className="sa-container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
                <div className="flex gap-6 md:gap-10">
                    <a className="hidden items-center space-x-2 md:flex" href="/">
                        {window.application.sandbox.config.context.brand?.image !== undefined && (
                            <img src={window.application.sandbox.config.context.brand.image} className="aspect-auto h-12" alt="Logo" />
                        )}
                    </a>
                    <nav className="hidden items-center space-x-6 text-sm font-semibold md:flex">
                        {!isLoading && coverPage && shouldShowCoverPage(coverPage, isEditing) && (
                            // biome-ignore lint/a11y/useValidAnchor: <explanation>
                            <a href={coverPage.url} onClick={handleAnchorElementClick} title={coverPage.title} aria-label={coverPage.title}>
                                {coverPage.title}
                            </a>
                        )}

                        {documentsAndGroups.map((documentOrDocumentGroup) => (
                            <HeaderDocumentOrDocumentGroup
                                key={documentOrDocumentGroup.id}
                                documentOrDocumentGroup={documentOrDocumentGroup}
                                onLinkClick={handleAnchorElementClick}
                            />
                        ))}
                    </nav>
                    <button type="button" className="flex items-center space-x-2 md:hidden" onClick={() => setShowMobileMenu(!showMobileMenu)}>
                        {showMobileMenu ? <X /> : <Menu />}
                        <span className="font-bold">{t('menu')}</span>
                    </button>
                    {showMobileMenu && (
                        <div className="fixed inset-0 top-16 z-50 grid h-[calc(100vh-4rem)] grid-flow-row auto-rows-max overflow-auto p-6 pb-32 shadow-md animate-in slide-in-from-bottom-80 md:hidden">
                            <div className="relative z-20 grid gap-6 rounded-md bg-background p-4 shadow-md">
                                <a className="flex items-center space-x-2" href="/">
                                    {window.application.sandbox.config.context.brand?.image !== undefined && (
                                        <img src={window.application.sandbox.config.context.brand.image} className="aspect-auto h-12" alt="Logo" />
                                    )}
                                </a>

                                <nav className="grid grid-flow-row auto-rows-max text-sm">
                                    {!isLoading && coverPage && shouldShowCoverPage(coverPage, isEditing) && (
                                        // biome-ignore lint/a11y/useValidAnchor: <explanation>
                                        <a
                                            href={coverPage.url}
                                            onClick={handleAnchorElementClick}
                                            title={coverPage.title}
                                            aria-label={coverPage.title}
                                            className="flex w-full items-center rounded-md p-2 text-sm font-medium hover:underline"
                                        >
                                            {coverPage.title}
                                        </a>
                                    )}

                                    {documentsAndGroups.map((documentOrDocumentGroup) => (
                                        <MobileHeaderDocumentOrDocumentGroup
                                            key={documentOrDocumentGroup.id}
                                            documentOrDocumentGroup={documentOrDocumentGroup}
                                            onLinkClick={handleAnchorElementClick}
                                        />
                                    ))}
                                </nav>
                            </div>
                        </div>
                    )}
                </div>
                <div className="flex flex-1 items-center space-x-4 sm:justify-end">
                    <div className="flex-1 sm:grow-0">
                        <Search />
                    </div>

                    <nav className="flex space-x-4">
                        {dataPortal?.i18n_enabled && !isLoadingPortal && !errorPortal ? (
                            <DropdownMenu>
                                <DropdownMenuTrigger
                                    className={buttonVariants({
                                        variant: 'ghost',
                                        size: 'sm',
                                    })}
                                    title={t('toggleLanguageMenu')}
                                    aria-label={t('toggleLanguageMenu')}
                                >
                                    {dataPortal.i18n_settings.languages.find((lang) => lang.language === document.documentElement.lang)?.label}
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    {dataPortal.i18n_settings.languages.map((language) => (
                                        <DropdownMenuItem key={language.language} onClick={(event) => handleLanguageClick(event, language.language)}>
                                            {language.label}
                                        </DropdownMenuItem>
                                    ))}
                                </DropdownMenuContent>
                            </DropdownMenu>
                        ) : null}

                        <DropdownMenu>
                            <DropdownMenuTrigger
                                className={buttonVariants({
                                    variant: 'ghost',
                                    size: 'sm',
                                })}
                                title={t('toggleModeMenu')}
                                aria-label={t('toggleModeMenu')}
                            >
                                {isDark ? <Moon /> : <Sun />}
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

                        {dataCurrentUser && !isLoadingCurrentUser && !errorCurrentUser ? (
                            <DropdownMenu>
                                <DropdownMenuTrigger>
                                    <Avatar>
                                        <AvatarImage src={dataCurrentUser.currentUser.avatar} />
                                        <AvatarFallback>{dataCurrentUser.currentUser.name?.slice(0, 1)}</AvatarFallback>
                                    </Avatar>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    <DropdownMenuItem onClick={handleLogOutClick}>
                                        <LogOut className="mr-2 h-4 w-4" />
                                        {t('logOut')}
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        ) : null}

                        {!isLoadingCurrentUser && !dataCurrentUser ? (
                            <Button size="sm" onClick={handleLogInClick}>
                                {t('logIn')}
                            </Button>
                        ) : null}
                    </nav>
                </div>
            </div>
        </header>
    );
};

const HeaderDocumentOrDocumentGroup = ({ documentOrDocumentGroup, onLinkClick }: HeaderDocumentOrDocumentGroupProps): ReactElement => {
    const { appBridge } = useThemeContext();

    const { documents: groupedDocuments } = useGroupedDocuments(appBridge, documentOrDocumentGroup.id, { enabled: isDocumentGroup(documentOrDocumentGroup) });

    if (isDocumentGroup(documentOrDocumentGroup)) {
        return (
            <DropdownMenu>
                <DropdownMenuTrigger className="group flex shrink-0 items-center break-keep">
                    <span key={documentOrDocumentGroup.id} title={documentOrDocumentGroup.name} aria-label={documentOrDocumentGroup.name}>
                        {documentOrDocumentGroup.name}
                    </span>
                    <ChevronDown className="ml-2 h-4 w-4 transition-transform duration-300 group-data-[state=open]:rotate-180" />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    {groupedDocuments.map((document) => (
                        <DropdownMenuItem key={document.id}>
                            <HeaderDocumentOrLink documentOrLink={document} onLinkClick={onLinkClick} />
                        </DropdownMenuItem>
                    ))}
                </DropdownMenuContent>
            </DropdownMenu>
        );
    }

    return <HeaderDocumentOrLink documentOrLink={documentOrDocumentGroup} onLinkClick={onLinkClick} />;
};

const MobileHeaderDocumentOrDocumentGroup = ({ documentOrDocumentGroup, onLinkClick }: HeaderDocumentOrDocumentGroupProps): ReactElement => {
    const { appBridge } = useThemeContext();

    const { documents: groupedDocuments } = useGroupedDocuments(appBridge, documentOrDocumentGroup.id, { enabled: isDocumentGroup(documentOrDocumentGroup) });

    if (isDocumentGroup(documentOrDocumentGroup)) {
        return (
            <Collapsible>
                <CollapsibleTrigger className="group flex shrink-0 items-center break-keep">
                    <a
                        key={documentOrDocumentGroup.id}
                        // biome-ignore lint/a11y/useValidAnchor: <explanation>
                        href="#"
                        title={documentOrDocumentGroup.name}
                        aria-label={documentOrDocumentGroup.name}
                        className="flex w-full items-center rounded-md p-2 text-sm font-medium group-hover:underline"
                    >
                        {documentOrDocumentGroup.name}
                    </a>
                    <ChevronDown className="ml-2 h-4 w-4 transition-transform duration-300 group-data-[state=open]:rotate-180" />
                </CollapsibleTrigger>
                <CollapsibleContent className="pl-2">
                    {groupedDocuments.map((document) => (
                        <MobileHeaderDocumentOrLink key={document.id} documentOrLink={document} onLinkClick={onLinkClick} />
                    ))}
                </CollapsibleContent>
            </Collapsible>
        );
    }

    return <MobileHeaderDocumentOrLink documentOrLink={documentOrDocumentGroup} onLinkClick={onLinkClick} />;
};

const HeaderDocumentOrLink = ({ documentOrLink, onLinkClick }: HeaderDocumentOrLinkProps): ReactElement => {
    if (documentOrLink.mode === 'DEFAULT' && documentOrLink.linkUrl !== null) {
        return (
            // biome-ignore lint/a11y/useValidAnchor: <explanation>
            <a
                key={documentOrLink.id}
                href={documentOrLink.linkUrl}
                onClick={onLinkClick}
                title={documentOrLink.title}
                aria-label={documentOrLink.title}
                className="flex shrink-0 items-center break-keep"
                target={documentOrLink.linkSettings?.newTab ? '_blank' : '_self'}
                rel="noreferrer"
            >
                {documentOrLink.linkSettings?.display !== 'ICON' && documentOrLink.title}
                {documentOrLink.linkSettings?.display !== 'TEXT' && documentOrLink.linkSettings?.iconUrl !== undefined && (
                    // biome-ignore lint/a11y/useAltText: <explanation>
                    <img src={documentOrLink.linkSettings.iconUrl} className={cn(documentOrLink.linkSettings?.display !== 'ICON' && 'ml-2', 'h-4 w-4 text-white ')} />
                )}
            </a>
        );
    }

    return (
        // biome-ignore lint/a11y/useValidAnchor: <explanation>
        <a
            key={documentOrLink.id}
            href={`/document/${documentOrLink.id}`}
            onClick={onLinkClick}
            title={documentOrLink.title}
            aria-label={documentOrLink.title}
            className="shrink-0 break-keep"
        >
            {documentOrLink.title}
        </a>
    );
};

const MobileHeaderDocumentOrLink = ({ documentOrLink, onLinkClick }: HeaderDocumentOrLinkProps): ReactElement => {
    if (documentOrLink.mode === 'DEFAULT' && documentOrLink.linkUrl !== null) {
        return (
            // biome-ignore lint/a11y/useValidAnchor: <explanation>
            <a
                key={documentOrLink.id}
                href={documentOrLink.linkUrl}
                onClick={onLinkClick}
                title={documentOrLink.title}
                aria-label={documentOrLink.title}
                className="flex w-full shrink-0 items-center break-keep rounded-md p-2 text-sm hover:underline"
                target={documentOrLink.linkSettings?.newTab ? '_blank' : '_self'}
                rel="noreferrer"
            >
                {documentOrLink.linkSettings?.display !== 'ICON' && documentOrLink.title}
                {documentOrLink.linkSettings?.display !== 'TEXT' && documentOrLink.linkSettings?.iconUrl !== undefined && (
                    // biome-ignore lint/a11y/useAltText: <explanation>
                    <img src={documentOrLink.linkSettings.iconUrl} className={cn(documentOrLink.linkSettings?.display !== 'ICON' && 'ml-2', 'h-4 w-4')} />
                )}
            </a>
        );
    }

    return (
        // biome-ignore lint/a11y/useValidAnchor: <explanation>
        <a
            key={documentOrLink.id}
            href={`/document/${documentOrLink.id}`}
            onClick={onLinkClick}
            title={documentOrLink.title}
            aria-label={documentOrLink.title}
            className="flex w-full shrink-0 items-center break-keep rounded-md p-2 text-sm hover:underline"
        >
            {documentOrLink.title}
        </a>
    );
};
