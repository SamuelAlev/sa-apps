import { MouseEvent, ReactElement, useMemo, useState } from 'react';
import { ChevronDown, Laptop, LogOut, Menu, Moon, Sun, X } from 'lucide-react';
import { Button } from '@sa-apps/button';
import { cn } from '@sa-apps/utilities';
import { useTranslations } from '@sa-apps/i18n';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@sa-apps/dropdown-menu';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@sa-apps/collapsible';
import { Avatar, AvatarFallback, AvatarImage } from '@sa-apps/avatar';
import sdk from '@sa-apps/api';
import {
    CoverPage,
    Document,
    DocumentGroup,
    useCoverPage,
    useDocumentGroups,
    useDocuments,
    useEditorState,
} from '@frontify/app-bridge';

import { useThemeMode } from './hooks';
import { useThemeContext } from './Context';
import { Search } from './Search';

type HeaderDocumentOrDocumentGroupProps = {
    documentOrDocumentGroup: Document | DocumentGroup;
    getDocumentsFromDocumentGroup: ReturnType<typeof useDocuments>['getGroupedDocuments'];
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
    const {
        data: dataCurrentUser,
        isLoading: isLoadingCurrentUser,
        error: errorCurrentUser,
    } = sdk.useCurrentUser('currentUser', undefined);

    const { t } = useTranslations();
    const [isDark, setThemeMode] = useThemeMode();
    const { appBridge, router } = useThemeContext();
    const { documentGroups } = useDocumentGroups(appBridge);
    const { getUngroupedDocuments, getGroupedDocuments } = useDocuments(appBridge);
    const { coverPage, isLoading } = useCoverPage(appBridge);
    const isEditing = useEditorState(appBridge);
    const [showMobileMenu, setShowMobileMenu] = useState<boolean>(false);

    const documentsAndGroups = useMemo(
        () =>
            [...getUngroupedDocuments(), ...documentGroups.values()].sort((a, b) =>
                a.sort && b.sort ? a.sort - b.sort : 0
            ),
        [documentGroups, getUngroupedDocuments]
    );

    const handleAnchorElementClick = (event: MouseEvent<HTMLAnchorElement>) => {
        const anchorElement = event.currentTarget;
        if (anchorElement.href.startsWith('/') || anchorElement.href.startsWith(window.location.origin)) {
            event.preventDefault();
            router.navigate(anchorElement.href.replace(window.location.origin, '') ?? '');
        }
    };

    const handleLogInClick = () => {
        window.location.href = `/auth/?referer=${encodeURIComponent(
            window.location.href.replace(window.location.origin, '')
        )}`;
    };

    const handleLogOutClick = () => {
        window.location.href = '/api/user/logout';
    };

    return (
        <header className="sticky z-40 w-full border-b border-b-border bg-background/80">
            <div className="sa-container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
                <div className="flex gap-6 md:gap-10">
                    <a className="hidden items-center space-x-2 md:flex" href="/">
                        {window.application.sandbox.config.context.brand?.image !== undefined && (
                            <img
                                src={window.application.sandbox.config.context.brand.image}
                                className="aspect-auto h-12"
                                alt="Logo"
                            />
                        )}
                    </a>
                    <nav className="hidden space-x-6 md:flex items-center text-sm font-semibold">
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

                        {documentsAndGroups.map((documentOrDocumentGroup) => (
                            <HeaderDocumentOrDocumentGroup
                                key={documentOrDocumentGroup.id}
                                getDocumentsFromDocumentGroup={getGroupedDocuments}
                                documentOrDocumentGroup={documentOrDocumentGroup}
                                onLinkClick={handleAnchorElementClick}
                            />
                        ))}
                    </nav>
                    <button
                        className="flex items-center space-x-2 md:hidden"
                        onClick={() => setShowMobileMenu(!showMobileMenu)}
                    >
                        {showMobileMenu ? <X /> : <Menu />}
                        <span className="font-bold">Menu</span>
                    </button>
                    {showMobileMenu && (
                        <div className="fixed inset-0 top-16 z-50 grid h-[calc(100vh-4rem)] grid-flow-row auto-rows-max overflow-auto p-6 pb-32 shadow-md animate-in slide-in-from-bottom-80 md:hidden">
                            <div className="relative z-20 grid gap-6 rounded-md bg-background p-4 shadow-md">
                                <a className="flex items-center space-x-2" href="/">
                                    {window.application.sandbox.config.context.brand?.image !== undefined && (
                                        <img
                                            src={window.application.sandbox.config.context.brand.image}
                                            className="aspect-auto h-12"
                                            alt="Logo"
                                        />
                                    )}
                                </a>

                                <nav className="grid grid-flow-row auto-rows-max text-sm">
                                    {!isLoading && coverPage && shouldShowCoverPage(coverPage, isEditing) && (
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
                                            getDocumentsFromDocumentGroup={getGroupedDocuments}
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

const HeaderDocumentOrDocumentGroup = ({
    documentOrDocumentGroup,
    getDocumentsFromDocumentGroup,
    onLinkClick,
}: HeaderDocumentOrDocumentGroupProps): ReactElement => {
    if ('documents' in documentOrDocumentGroup) {
        return (
            <DropdownMenu>
                <DropdownMenuTrigger className="group flex items-center break-keep shrink-0">
                    <a
                        key={documentOrDocumentGroup.id}
                        href="#"
                        title={documentOrDocumentGroup.name}
                        aria-label={documentOrDocumentGroup.name}
                    >
                        {documentOrDocumentGroup.name}
                    </a>
                    <ChevronDown className="ml-2 h-4 w-4 transition-transform duration-300 group-data-[state=open]:rotate-180" />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    {getDocumentsFromDocumentGroup(documentOrDocumentGroup.id).map((document) => (
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

const MobileHeaderDocumentOrDocumentGroup = ({
    documentOrDocumentGroup,
    getDocumentsFromDocumentGroup,
    onLinkClick,
}: HeaderDocumentOrDocumentGroupProps): ReactElement => {
    if ('documents' in documentOrDocumentGroup) {
        return (
            <Collapsible>
                <CollapsibleTrigger className="group flex items-center break-keep shrink-0">
                    <a
                        key={documentOrDocumentGroup.id}
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
                    {getDocumentsFromDocumentGroup(documentOrDocumentGroup.id).map((document) => (
                        <MobileHeaderDocumentOrLink
                            key={document.id}
                            documentOrLink={document}
                            onLinkClick={onLinkClick}
                        />
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
            <a
                key={documentOrLink.id}
                href={documentOrLink.linkUrl}
                onClick={onLinkClick}
                title={documentOrLink.title}
                aria-label={documentOrLink.title}
                className="flex items-center break-keep shrink-0"
                target={documentOrLink.linkSettings?.newTab ? '_blank' : '_self'}
                rel="noreferrer"
            >
                {documentOrLink.linkSettings?.display !== 'ICON' && documentOrLink.title}
                {documentOrLink.linkSettings?.display !== 'TEXT' &&
                    documentOrLink.linkSettings?.iconUrl !== undefined && (
                        <img
                            src={documentOrLink.linkSettings.iconUrl}
                            className={cn(
                                documentOrLink.linkSettings?.display !== 'ICON' && 'ml-2',
                                'h-4 w-4 text-white '
                            )}
                        />
                    )}
            </a>
        );
    }

    return (
        <a
            key={documentOrLink.id}
            href={`/document/${documentOrLink.id}`}
            onClick={onLinkClick}
            title={documentOrLink.title}
            aria-label={documentOrLink.title}
            className="break-keep shrink-0"
        >
            {documentOrLink.title}
        </a>
    );
};

const MobileHeaderDocumentOrLink = ({ documentOrLink, onLinkClick }: HeaderDocumentOrLinkProps): ReactElement => {
    if (documentOrLink.mode === 'DEFAULT' && documentOrLink.linkUrl !== null) {
        return (
            <a
                key={documentOrLink.id}
                href={documentOrLink.linkUrl}
                onClick={onLinkClick}
                title={documentOrLink.title}
                aria-label={documentOrLink.title}
                className="break-keep shrink-0 flex w-full items-center rounded-md p-2 text-sm hover:underline"
                target={documentOrLink.linkSettings?.newTab ? '_blank' : '_self'}
                rel="noreferrer"
            >
                {documentOrLink.linkSettings?.display !== 'ICON' && documentOrLink.title}
                {documentOrLink.linkSettings?.display !== 'TEXT' &&
                    documentOrLink.linkSettings?.iconUrl !== undefined && (
                        <img
                            src={documentOrLink.linkSettings.iconUrl}
                            className={cn(documentOrLink.linkSettings?.display !== 'ICON' && 'ml-2', 'h-4 w-4')}
                        />
                    )}
            </a>
        );
    }

    return (
        <a
            key={documentOrLink.id}
            href={`/document/${documentOrLink.id}`}
            onClick={onLinkClick}
            title={documentOrLink.title}
            aria-label={documentOrLink.title}
            className="break-keep shrink-0 flex w-full items-center rounded-md p-2 text-sm hover:underline"
        >
            {documentOrLink.title}
        </a>
    );
};
