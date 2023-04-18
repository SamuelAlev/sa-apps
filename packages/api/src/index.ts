import { GraphQLClient } from 'graphql-request';
import { getSdkWithHooks } from './generated';

const sdk = getSdkWithHooks(new GraphQLClient('/graphql-internal'));

export default sdk;
