import { useCategorizedDocumentPages, useDocumentCategories, useUncategorizedDocumentPages } from "@frontify/app-bridge";
import { ScrollArea } from "@sa-apps/scroll-area";
import { cn } from "@sa-apps/utilities";
import type { ReactElement } from "react";
import { useThemeContext } from "./Context";
import { useCurrentPath } from "./hooks/useCurrentPath";
import styles from "./Sidebar.module.scss";

export const Sidebar = (): ReactElement => {
	const { appBridge, context } = useThemeContext();
	const documentId = context.template?.type !== "cover" && context.template?.document.id ? context.template?.document.id : 0;
	const currentPath = useCurrentPath();

	const { documentCategories } = useDocumentCategories(appBridge, documentId);
	const { documentPages: uncategorizedDocumentPages } = useUncategorizedDocumentPages(appBridge, documentId);

	return (
		<aside className={styles.sidebar}>
			<ScrollArea>
				<div className={styles.sidebarInner}>
					{documentCategories.map((documentCategory) => (
						<div key={documentCategory.id} className={styles.category}>
							<h4 className={styles.categoryTitle}>{documentCategory.title}</h4>
							<div className={styles.categoryList}>
								{documentCategories.map((documentCategory) => {
									// biome-ignore lint/correctness/useHookAtTopLevel: need to move it to a separate component
									const { documentPages } = useCategorizedDocumentPages(appBridge, documentCategory.id);

									return documentPages.map((documentPage) => (
										<a
											key={documentPage.id}
											className={cn(
												styles.sidebarLink,
												currentPath === `/document/${documentId}#/${documentCategory.slug}/${documentPage.slug}` &&
													styles.sidebarLinkActive,
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
						<div className={styles.category}>
							{uncategorizedDocumentPages.map((documentPage) => (
								<a
									key={documentPage.id}
									className={cn(
										styles.sidebarLink,
										currentPath === `/document/${documentId}#/${documentPage.slug}` && styles.sidebarLinkActive,
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
