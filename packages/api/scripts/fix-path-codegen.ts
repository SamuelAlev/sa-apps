import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const GENERATED_FILE_PATH = join(__dirname, '../src/generated.ts');
const generatedFileContent = readFileSync(GENERATED_FILE_PATH, 'utf-8');
const newContent = generatedFileContent.replaceAll("from 'graphql-request/dist/types';", "from 'graphql-request';");
writeFileSync(GENERATED_FILE_PATH, newContent);
