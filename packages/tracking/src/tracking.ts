export const init = (id: string) => {
    return new Promise((resolve, reject) => {
        if (window.clarity) {
            resolve();
        }

        window.clarity ||= (...args: unknown[]) => {
            (window.clarity.q ||= []).push(args);
        };

        const scriptTag = document.createElement('script');
        scriptTag.async = true;
        scriptTag.src = `https://www.clarity.ms/tag/${id}`;
        scriptTag.addEventListener('load', () => {
            resolve();
        });

        scriptTag.addEventListener('error', () => {
            reject();
        });

        const firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode?.insertBefore(scriptTag, firstScriptTag);
    });
};

export const hasStarted = () => {
    return typeof window.clarity === 'function';
};

export const identify = (userId: string, properties: string) => {
    window.clarity('identify', userId, properties);
};

export const consent = () => {
    window.clarity('consent');
};

export const setTag = (key: string, value: string) => {
    window.clarity('set', key, value);
};

export const upgrade = (reason: string) => {
    window.clarity('upgrade', reason);
};
