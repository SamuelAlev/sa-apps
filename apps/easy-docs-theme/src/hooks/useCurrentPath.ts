import { useEffect, useState } from 'react';

export const useCurrentPath = (): string => {
    const [currentPath, setCurrentPath] = useState(window.location.pathname + window.location.hash);

    useEffect(() => {
        const handleLocationChange = () => {
            setCurrentPath(window.location.pathname + window.location.hash);
        };

        window.addEventListener('popstate', handleLocationChange);

        return () => window.removeEventListener('popstate', handleLocationChange);
    }, []);

    return currentPath;
};
