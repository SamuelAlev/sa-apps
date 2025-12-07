export const getCsrfToken = (): string => {
	const tokenElement = document.getElementsByName("x-csrf-token");

	if (tokenElement.length > 0) {
		return (tokenElement[0] as HTMLMetaElement).content;
	}

	return "";
};
