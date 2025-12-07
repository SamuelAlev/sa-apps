import type { SWRConfiguration as SWRConfigInterface, Key as SWRKeyInterface } from "swr";
import useSWR from "swr";
import { getCsrfToken } from "./csrf";

const fetcher = <T>(url: string) =>
	fetch(url, { headers: new Headers({ "X-CSRF-TOKEN": getCsrfToken() }) })
		.then((response) => response.json())
		.then((response: { data: T }) => response.data);

type Portal = {
	id: number;
	title: string;
	project_id: number;
	brand_id: number;
	i18n_enabled: 0 | 1 | boolean;
	i18n_settings: i18nSetting;
	visibility: PortalVisibilityType;
	public_link_enabled: boolean;
	brandportal_enabled: boolean;
	marketplace_app_id: null | number;
	design_settings_preset_id: null | number;
};

type i18nSetting = {
	languages: PortalI18nLanguage[];
};

type PortalI18nLanguage = {
	language: string;
	label: string;
	default: boolean;
	draft: boolean;
};

enum PortalVisibilityType {
	Private = "PRIVATE",
	Public = "PUBLIC",
}

export const restSdk = {
	usePortal(key: SWRKeyInterface, variables: { portalId: number }, config?: SWRConfigInterface<Portal>) {
		return useSWR<Portal>(key, () => fetcher(`/api/portal/${variables.portalId}`), config);
	},
};
