import type { ThemeProps } from "@frontify/guideline-themes";
import { cn } from "@sa-apps/utilities";
import type { ReactElement } from "react";

import { ThemeContext } from "./Context";
import styles from "./EasyDocsTheme.module.scss";
import { Header } from "./Header";
import { Sidebar } from "./Sidebar";
import { TableOfContent } from "./TableOfContent";

export const EasyDocsTheme = ({ appBridge, router, Content }: ThemeProps): ReactElement | null => {
	const context = appBridge.context().get();

	return (
		<ThemeContext.Provider value={{ appBridge, router, context }}>
			<div data-test-id="easy-docs-theme" className={cn("sa-root", styles.root)}>
				<Header />

				{context.template?.type === "documentPage" ? (
					<div className={cn("sa-container", styles.container)}>
						<div className={styles.layout}>
							<Sidebar />
							<main className={styles.main}>
								<div id="content-area" className={styles.contentArea}>
									<Content />
								</div>
								<div className={styles.tocWrapper}>
									<TableOfContent />
								</div>
							</main>
						</div>
					</div>
				) : (
					<Content />
				)}
			</div>
		</ThemeContext.Provider>
	);
};
