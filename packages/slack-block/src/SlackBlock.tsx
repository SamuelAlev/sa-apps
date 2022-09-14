/* (c) Copyright Frontify Ltd., all rights reserved. */

import { AppBridgeBlock } from '@frontify/app-bridge';
import { FC } from 'react';

type Props = {
    appBridge: AppBridgeBlock;
};

export const SlackBlock: FC<Props> = ({ appBridge }) => {
    return <div>Slack Block</div>;
};
