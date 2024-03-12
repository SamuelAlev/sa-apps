import { useEffect, useRef, useState } from 'react';
import type { ShikiCodeToHtml } from './types';

export const usePrettyCode = (code: string, options: { language: string; theme: string } = { language: 'mermaid', theme: 'github-dark' }) => {
    const shikiCodeToHtml = useRef<ShikiCodeToHtml | null>(null);
    const [prettyCode, setPrettyCode] = useState('');

    useEffect(() => {
        const renderPrettyCode = async () => {
            // @ts-expect-error Loading from CDN with treeshaking
            shikiCodeToHtml.current ??= await import('https://esm.sh/shiki@^1.0.0').then((mod) => mod.codeToHtml);
            if (shikiCodeToHtml.current) {
                const renderedCode = await shikiCodeToHtml.current(`\`\`\`mermaid\n${code}\n\`\`\``, {
                    lang: options.language,
                    theme: options.theme,
                });

                setPrettyCode(renderedCode);
            }
        };

        renderPrettyCode();
    }, [code, options.language, options.theme]);

    return prettyCode;
};
