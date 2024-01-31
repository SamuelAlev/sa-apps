import { GraphQLClient } from 'graphql-request';

import { getSdkWithHooks } from './generated';
import { restSdk } from './restSdk';
import { getCsrfToken } from './csrf';

const graphqlSdk = getSdkWithHooks(
    new GraphQLClient('/graphql-internal', { headers: new Headers({ 'X-CSRF-TOKEN': getCsrfToken() }) }),
);

export default { ...graphqlSdk, ...restSdk };
