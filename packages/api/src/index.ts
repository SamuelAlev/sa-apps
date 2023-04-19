import { GraphQLClient } from 'graphql-request';
import { getSdkWithHooks } from './generated';

const getCsrfToken = (): string => {
    const tokenElement = document.getElementsByName('x-csrf-token');

    if (tokenElement.length > 0) {
        return (tokenElement[0] as HTMLMetaElement).content;
    }

    return '';
};

const sdk = getSdkWithHooks(
    new GraphQLClient('/graphql-internal', { headers: new Headers({ 'X-CSRF-TOKEN': getCsrfToken() }) })
);

export default sdk;
