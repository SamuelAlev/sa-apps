declare global {
    interface Window {
        application: { sandbox: { config: { context: { authenticated: boolean; brand: { image?: string } } } } };
    }
}

export {};
