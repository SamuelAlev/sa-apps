import type { ComponentType, FC, ReactElement } from "react";
import { useEffect, useState } from "react";

export const WEBSITE_ID_DEV = "212abf2f-e320-41ec-9999-8a2295d5db5a";

export const store: { websiteId: string } = {
	websiteId: "",
};

export const withTracking =
	(websiteId: string) =>
	<P extends object>(Component: ComponentType<P>): FC<P> => {
		return function withTracking(props): ReactElement {
			const [loaded, setLoaded] = useState(false);

			useEffect(() => {
				const initTracking = () => {
					if (document.querySelector('script[src="https://analytics.alev.dev/script.js"]')) {
						setLoaded(true);
						return;
					}

					const script = document.createElement("script");
					script.setAttribute("src", "https://analytics.alev.dev/script.js");
					script.setAttribute("data-auto-track", "false");
					script.setAttribute("defer", "true");

					script.addEventListener("load", () => {
						setLoaded(true);
					});

					document.body.appendChild(script);
				};

				initTracking();

				return () => {
					const script = document.querySelector('[src="https://analytics.alev.dev/script.js"]');
					script?.remove();
				};
			}, []);

			// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
			useEffect(() => {
				if (loaded && websiteId) {
					store.websiteId = import.meta.env.PROD ? (websiteId ?? "") : WEBSITE_ID_DEV;
					window.umami?.track((props) => ({ ...props, website: store.websiteId }));
				}
			}, [websiteId, loaded]);

			return <Component {...props} />;
		};
	};
