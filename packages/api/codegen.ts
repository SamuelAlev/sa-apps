import { type CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
    overwrite: true,
    generates: {
        './src/generated.ts': {
            schema: {
                'https://frontify.alev.cloud/graphql': {
                    headers: {
                        // eslint-disable-next-line no-template-curly-in-string
                        Authorization: '${GRAPHQL_API_BEARER_TOKEN}',
                    },
                },
            },
            documents: ['./src/**/*.graphql'],
            plugins: ['typescript', 'typescript-operations', 'typescript-graphql-request', 'plugin-typescript-swr'],
        },
    },
    config: {
        scalars: {
            DateTime: 'string',
            JSON: 'unknown',
            Upload: 'unknown',
            Time: 'string',
            Date: 'string',
            Long: 'number',
        },
    },
    hooks: {
        afterAllFileWrite: ['tsx scripts/fix-path-codegen.ts'],
    },
};

export default config;
