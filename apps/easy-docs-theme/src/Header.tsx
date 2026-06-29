import type { CoverPage, Document, DocumentGroup } from "@frontify/app-bridge";
import { useCoverPage, useDocumentGroups, useEditorState, useGroupedDocuments, useUngroupedDocuments } from "@frontify/app-bridge";
import sdk from "@sa-apps/api";
import { Avatar, AvatarFallback, AvatarImage } from "@sa-apps/avatar";
import { Button, buttonVariants } from "@sa-apps/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@sa-apps/collapsible";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@sa-apps/dropdown-menu";
import { useTranslations } from "@sa-apps/i18n";
import { cn } from "@sa-apps/utilities";
import { ChevronDown, Laptop, LogOut, Menu, Moon, Sun, X } from "lucide-react";
import type { MouseEvent, ReactElement } from "react";
import { useMemo, useState } from "react";

import { useThemeContext } from "./Context";
import styles from "./Header.module.scss";
import { getLinkFromLanguage } from "./helpers/language";
import { isDocumentGroup } from "./helpers/types";
import { useThemeMode } from "./hooks/useThemeMode";
import { Search } from "./Search";

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

	const portalId = appBridge.context("portalId").get();
	const isLoggedIn = window.application.sandbox.config.context.authenticated;

	const {
		data: dataCurrentUser,
		isLoading: isLoadingCurrentUser,
		error: errorCurrentUser,
	} = sdk.useCurrentUser(isLoggedIn ? "currentUser" : null, undefined);

	const {
		data: dataPortal,
		isLoading: isLoadingPortal,
		error: errorPortal,
	} = sdk.usePortal(isLoggedIn ? `portal-${portalId}` : null, { portalId });

	const documentsAndGroups = useMemo(
		() => [...ungroupedDocuments, ...documentGroups.values()].sort((a, b) => (a.sort && b.sort ? a.sort - b.sort : 0)),
		[documentGroups, ungroupedDocuments],
	);

	const handleAnchorElementClick = (event: MouseEvent<HTMLAnchorElement>) => {
		const anchorElement = event.currentTarget;
		if (anchorElement.href.startsWith("/") || anchorElement.href.startsWith(window.location.origin)) {
			event.preventDefault();
			router.navigate(anchorElement.href.replace(window.location.origin, "") ?? "");
		}
	};

	const handleLogInClick = () => {
		window.location.href = `/auth/?referer=${encodeURIComponent(window.location.href.replace(window.location.origin, ""))}`;
	};

	const handleLogOutClick = () => {
		window.location.href = "/api/user/logout";
	};

	const handleLanguageClick = (event: MouseEvent, language: string) => {
		event.preventDefault();
		alert("Language switcher is not yet implemented 🥲");
		window.location.href = getLinkFromLanguage(language);
	};

	return (
		<header className={styles.header}>
			<div className={cn("sa-container", styles.headerContainer)}>
				<div className={styles.navSection}>
					<a className={styles.brandLink} href="/">
						{window.application.sandbox.config.context.brand?.image !== undefined && (
							<img src={window.application.sandbox.config.context.brand.image} className={styles.brandImage} alt="Logo" />
						)}
					</a>
					<nav className={styles.mainNav}>
						{!isLoading && coverPage && shouldShowCoverPage(coverPage, isEditing) && (
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
					<button type="button" className={styles.mobileMenuButton} onClick={() => setShowMobileMenu(!showMobileMenu)}>
						{showMobileMenu ? <X /> : <Menu />}
						<span className={styles.menuLabel}>{t("menu")}</span>
					</button>
					{showMobileMenu && (
						<div className={styles.mobileMenu}>
							<div className={styles.mobileMenuPanel}>
								<a className={styles.mobileBrandLink} href="/">
									{window.application.sandbox.config.context.brand?.image !== undefined && (
										<img
											src={window.application.sandbox.config.context.brand.image}
											className={styles.brandImage}
											alt="Logo"
										/>
									)}
								</a>

								<nav className={styles.mobileNav}>
									{!isLoading && coverPage && shouldShowCoverPage(coverPage, isEditing) && (
										<a
											href={coverPage.url}
											onClick={handleAnchorElementClick}
											title={coverPage.title}
											aria-label={coverPage.title}
											className={styles.mobileNavLink}
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
				<div className={styles.headerActions}>
					<div className={styles.searchWrapper}>
						<Search />
					</div>

					<nav className={styles.actionNav}>
						{dataPortal?.i18n_enabled && !isLoadingPortal && !errorPortal ? (
							<DropdownMenu>
								<DropdownMenuTrigger
									className={buttonVariants({
										variant: "ghost",
										size: "sm",
									})}
									title={t("toggleLanguageMenu")}
									aria-label={t("toggleLanguageMenu")}
								>
									{
										dataPortal.i18n_settings.languages.find((lang) => lang.language === document.documentElement.lang)
											?.label
									}
								</DropdownMenuTrigger>
								<DropdownMenuContent align="end">
									{dataPortal.i18n_settings.languages.map((language) => (
										<DropdownMenuItem
											key={language.language}
											onClick={(event) => handleLanguageClick(event, language.language)}
										>
											{language.label}
										</DropdownMenuItem>
									))}
								</DropdownMenuContent>
							</DropdownMenu>
						) : null}

						<DropdownMenu>
							<DropdownMenuTrigger
								className={buttonVariants({
									variant: "ghost",
									size: "sm",
								})}
								title={t("toggleModeMenu")}
								aria-label={t("toggleModeMenu")}
							>
								{isDark ? <Moon /> : <Sun />}
							</DropdownMenuTrigger>
							<DropdownMenuContent align="end">
								<DropdownMenuItem onClick={() => setThemeMode("light")}>
									<Sun className={styles.menuItemIcon} />
									{t("light")}
								</DropdownMenuItem>
								<DropdownMenuItem onClick={() => setThemeMode("dark")}>
									<Moon className={styles.menuItemIcon} />
									{t("dark")}
								</DropdownMenuItem>
								<DropdownMenuItem onClick={() => setThemeMode("system")}>
									<Laptop className={styles.menuItemIcon} />
									{t("system")}
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
										<LogOut className={styles.menuItemIcon} />
										{t("logOut")}
									</DropdownMenuItem>
								</DropdownMenuContent>
							</DropdownMenu>
						) : null}

						{!isLoadingCurrentUser && !dataCurrentUser ? (
							<Button size="sm" onClick={handleLogInClick}>
								{t("logIn")}
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

	const { documents: groupedDocuments } = useGroupedDocuments(appBridge, documentOrDocumentGroup.id, {
		enabled: isDocumentGroup(documentOrDocumentGroup),
	});

	if (isDocumentGroup(documentOrDocumentGroup)) {
		return (
			<DropdownMenu>
				<DropdownMenuTrigger className={styles.groupTrigger}>
					<span key={documentOrDocumentGroup.id} title={documentOrDocumentGroup.name}>
						{documentOrDocumentGroup.name}
					</span>
					<ChevronDown className={styles.chevron} />
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

const MobileHeaderDocumentOrDocumentGroup = ({
	documentOrDocumentGroup,
	onLinkClick,
}: HeaderDocumentOrDocumentGroupProps): ReactElement => {
	const { appBridge } = useThemeContext();

	const { documents: groupedDocuments } = useGroupedDocuments(appBridge, documentOrDocumentGroup.id, {
		enabled: isDocumentGroup(documentOrDocumentGroup),
	});

	if (isDocumentGroup(documentOrDocumentGroup)) {
		return (
			<Collapsible>
				<CollapsibleTrigger className={styles.groupTrigger}>
					<a
						key={documentOrDocumentGroup.id}
						// biome-ignore lint/a11y/useValidAnchor: <explanation>
						href="#"
						title={documentOrDocumentGroup.name}
						aria-label={documentOrDocumentGroup.name}
						className={styles.mobileGroupLink}
					>
						{documentOrDocumentGroup.name}
					</a>
					<ChevronDown className={styles.chevron} />
				</CollapsibleTrigger>
				<CollapsibleContent className={styles.collapsibleContent}>
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
	if (documentOrLink.mode === "DEFAULT" && documentOrLink.linkUrl !== null) {
		return (
			<a
				key={documentOrLink.id}
				href={documentOrLink.linkUrl}
				onClick={onLinkClick}
				title={documentOrLink.title}
				aria-label={documentOrLink.title}
				className={styles.desktopLinkItem}
				target={documentOrLink.linkSettings?.newTab ? "_blank" : "_self"}
				rel="noreferrer"
			>
				{documentOrLink.linkSettings?.display !== "ICON" && documentOrLink.title}
				{documentOrLink.linkSettings?.display !== "TEXT" && documentOrLink.linkSettings?.iconUrl !== undefined && (
					// biome-ignore lint/a11y/useAltText: <explanation>
					<img
						src={documentOrLink.linkSettings.iconUrl}
						className={cn(
							styles.linkIcon,
							styles.linkIconWhite,
							documentOrLink.linkSettings?.display !== "ICON" && styles.linkIconMargin,
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
			className={styles.desktopDocLink}
		>
			{documentOrLink.title}
		</a>
	);
};

const MobileHeaderDocumentOrLink = ({ documentOrLink, onLinkClick }: HeaderDocumentOrLinkProps): ReactElement => {
	if (documentOrLink.mode === "DEFAULT" && documentOrLink.linkUrl !== null) {
		return (
			<a
				key={documentOrLink.id}
				href={documentOrLink.linkUrl}
				onClick={onLinkClick}
				title={documentOrLink.title}
				aria-label={documentOrLink.title}
				className={styles.mobileLinkItem}
				target={documentOrLink.linkSettings?.newTab ? "_blank" : "_self"}
				rel="noreferrer"
			>
				{documentOrLink.linkSettings?.display !== "ICON" && documentOrLink.title}
				{documentOrLink.linkSettings?.display !== "TEXT" && documentOrLink.linkSettings?.iconUrl !== undefined && (
					// biome-ignore lint/a11y/useAltText: icon doesn't have alt here
					<img
						src={documentOrLink.linkSettings.iconUrl}
						className={cn(styles.linkIcon, documentOrLink.linkSettings?.display !== "ICON" && styles.linkIconMargin)}
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
			className={styles.mobileLinkItem}
		>
			{documentOrLink.title}
		</a>
	);
};
