/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly PROD: boolean;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}

declare global {
    interface Window {
        application: { sandbox: { config: { context: { authenticated: boolean; brand: { image?: string } } } } };
    }
}

export {};
