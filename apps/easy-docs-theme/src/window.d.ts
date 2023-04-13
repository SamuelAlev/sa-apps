declare global {
    interface Window {
        application: { sandbox: { config: { context: { brand: { image?: string } } } } };
    }
}

export {};
