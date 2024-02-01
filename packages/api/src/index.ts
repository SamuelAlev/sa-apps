import { GraphQLClient } from 'graphql-request';

import { getCsrfToken } from './csrf';
import { getSdkWithHooks } from './generated';
import { restSdk } from './restSdk';

const graphqlSdk = getSdkWithHooks(
    new GraphQLClient('/graphql-internal', {
        headers: new Headers({ 'X-CSRF-TOKEN': getCsrfToken() }),
    }),
);

export default { ...graphqlSdk, ...restSdk };
