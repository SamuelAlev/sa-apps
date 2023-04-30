import type { VideoHTMLAttributes } from 'react';
import { forwardRef, useRef, useState } from 'react';
import { Loader2 } from 'lucide-react';

import { prepareImageUrl } from './helpers';

export const Video = forwardRef<HTMLVideoElement, VideoHTMLAttributes<HTMLVideoElement>>(({ style, ...props }, ref) => {
    const [state, setState] = useState<'init' | 'loading' | 'ready'>('init');

    const timeoutId = useRef<number | null>(null);

    const handleLoadStart = () => {
        timeoutId.current = window.setTimeout(() => {
            if (state === 'init') {
                setState('loading');
            }
        }, 300);
    };

    const handleLoadedData = () => {
        setState('ready');
        timeoutId.current !== null && clearTimeout(timeoutId.current);
    };

    return (
        <>
            {state === 'init' && (
                <img
                    draggable={false}
                    className="h-full flex-grow select-none overflow-hidden object-cover"
                    src={props?.src ? prepareImageUrl(props.src) : undefined}
                />
            )}

            {state === 'loading' && (
                <div className="relative flex h-full w-full items-center justify-center">
                    <img
                        draggable={false}
                        className="h-full flex-grow select-none overflow-hidden object-cover blur-sm grayscale"
                        src={props?.src ? prepareImageUrl(props.src) : undefined}
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                        <Loader2 className="animate-spin text-white" size={32} />
                    </div>
                </div>
            )}

            <video
                poster={props?.src ? prepareImageUrl(props.src) : undefined}
                /* Using `style` as the `block` class is used in Clarify */
                style={{ display: state === 'ready' ? 'block' : 'none', ...style }}
                {...props}
                ref={ref}
                onLoadStart={handleLoadStart}
                onLoadedData={handleLoadedData}
            />
        </>
    );
});
Video.displayName = 'SAVideo';
