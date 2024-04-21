import { useEditorState } from '@frontify/app-bridge';
import type { BlockProps } from '@frontify/guideline-blocks-settings';
import { Avatar, AvatarFallback, AvatarImage } from '@sa-apps/avatar';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@sa-apps/tooltip';
import { cn } from '@sa-apps/utilities';
import { type ComponentType, type FC, type ReactElement, type ReactNode, useEffect, useRef, useState, useSyncExternalStore } from 'react';
import { WebrtcProvider } from 'y-webrtc';
import * as Y from 'yjs';

import { useBlockFocus } from './useBlockFocus';

type User = {
    name: string;
    avatar: string;
};

type OnlineUsersProviderProps = {
    visible: boolean;
    isUserVisible: boolean;
    children: ReactNode;
    roomName: string;
    user: User[];
};

const SIGNALING_SERVER = 'wss://frontify-apps-signaling.alev.dev';

export const OnlineUsersProvider = ({ visible, isUserVisible, roomName, children, user }: OnlineUsersProviderProps) => {
    const ydoc = useRef<Y.Doc | null>(null);
    const provider = useRef<WebrtcProvider | null>(null);

    const [users, setUsers] = useState<User[]>([]);

    useEffect(() => {
        if (visible) {
            ydoc.current = new Y.Doc();
            provider.current = new WebrtcProvider(roomName, ydoc.current, { signaling: [SIGNALING_SERVER] });
            const awareness = provider.current.awareness;

            awareness.on('change', () => {
                setUsers((Array.from(awareness.getStates().values()) as unknown as { user: User }[]).map((item) => item.user));
            });
        }

        return () => {
            provider.current?.awareness.destroy();
            provider.current?.destroy();
        };
    }, [roomName, visible]);

    useEffect(() => {
        if (isUserVisible) {
            provider.current?.awareness.setLocalStateField('user', user);
        } else {
            provider.current?.awareness.setLocalStateField('user', null);
        }

        return () => {
            provider.current?.awareness.setLocalStateField('user', null);
        };
    }, [isUserVisible, user]);

    return (
        <div className="relative isolate">
            {visible && (
                <div className="z-50 absolute -top-2 right-0 rtl:right-full rtl:left-0 flex">
                    <TooltipProvider>
                        {users?.filter(Boolean).map((user, index) => (
                            <Tooltip key={user.name}>
                                <TooltipTrigger>
                                    <Avatar className={cn('h-8 w-8', index !== 0 ? '-ml-2 rtl:ml-0 rtl:-mr-2' : '')}>
                                        <AvatarImage src={user.avatar} />
                                        <AvatarFallback>{user.name.slice(0, 1)}</AvatarFallback>
                                    </Avatar>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>{user.name}</p>
                                </TooltipContent>
                            </Tooltip>
                        ))}
                    </TooltipProvider>
                </div>
            )}
            {children}
        </div>
    );
};

export const withOnlineUsers = (Component: ComponentType<BlockProps>): FC<BlockProps> => {
    return function withOnlineUsers(props): ReactElement {
        const isEditing = useEditorState(props.appBridge);
        const isBlockFocused = useBlockFocus(props.appBridge);
        const roomName = `mermaid-block-${props.appBridge.context('blockId').get()}`;

        return (
            <OnlineUsersProvider
                visible={isEditing}
                isUserVisible={isBlockFocused}
                roomName={roomName}
                // @ts-expect-error the hook makes a fetch request :(
                user={{ name: window.application.sandbox.config.context?.user?.name, avatar: window.application.sandbox.config.context?.user?.preview_url_without_placeholder }}
            >
                <Component {...props} />
            </OnlineUsersProvider>
        );
    };
};
