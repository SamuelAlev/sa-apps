import { useEffect, useRef, useState } from "react";
import type { codeToHtml } from "shiki";

import packageJson from "../package.json";

export const usePrettyCode = (
	code: string,
	options: { language: string; theme: string } = { language: "mermaid", theme: "github-dark" },
) => {
	const shikiCodeToHtml = useRef<typeof codeToHtml | null>(null);
	const [prettyCode, setPrettyCode] = useState("");

	useEffect(() => {
		const renderPrettyCode = async () => {
			shikiCodeToHtml.current ??= await import(/* @vite-ignore */ `https://esm.sh/shiki@${packageJson.dependencies.shiki}`).then(
				(mod) => mod.codeToHtml,
			);
			if (shikiCodeToHtml.current) {
				const renderedCode = await shikiCodeToHtml.current(`\`\`\`mermaid\n${code}\n\`\`\``, {
					lang: options.language,
					theme: options.theme,
				});

				// Remove first and last line with "```mermaid", "```" and the 2 `\n`, because Shiki needs them to detect the language
				const codeElement = document.createElement("div");
				codeElement.innerHTML = renderedCode;

				const lineClasses = codeElement.querySelectorAll(".line");

				if (lineClasses.length > 0) {
					lineClasses[0].parentNode?.removeChild(lineClasses[0]);
					lineClasses[lineClasses.length - 1].parentNode?.removeChild(lineClasses[lineClasses.length - 1]);
				}

				const codeTag = codeElement.querySelector("code");
				codeTag?.childNodes[0].remove();
				codeTag?.childNodes[codeTag.childNodes.length - 1].remove();

				setPrettyCode(codeElement.innerHTML);
			}
		};

		renderPrettyCode();
	}, [code, options.language, options.theme]);

	return prettyCode;
};
