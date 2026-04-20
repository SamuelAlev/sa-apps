import type { ComponentType, FC, ReactElement } from "react";
import { useEffect } from "react";

const WEBSITE_ID_DEV = "212abf2f-e320-41ec-9999-8a2295d5db5a";
const WEBSITE_ID_PROD = "3afa73ed-5af0-4d9b-8a90-a2869d7ef7ec";
const UMAMI_ENDPOINT = "https://analytics.alev.dev/api/send";

let currentTag = "";

const WEBSITE_ID = import.meta.env.PROD ? WEBSITE_ID_PROD : WEBSITE_ID_DEV;

export const sendEvent = (name?: string, data?: Record<string, string | number>) => {
	fetch(UMAMI_ENDPOINT, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({
			payload: {
				hostname: window.location.hostname,
				language: navigator.language,
				referrer: document.referrer,
				screen: `${window.screen.width}x${window.screen.height}`,
				title: document.title,
				url: window.location.pathname,
				website: WEBSITE_ID,
				tag: currentTag,
				...(name ? { name } : {}),
				...(data ? { data } : {}),
			},
			type: "event",
		}),
	});
};

export const withTracking =
	(tag: string) =>
	<P extends object>(Component: ComponentType<P>): FC<P> => {
		return function withTracking(props): ReactElement {
			useEffect(() => {
				currentTag = tag;
				sendEvent();
			}, []);

			return <Component {...props} />;
		};
	};
