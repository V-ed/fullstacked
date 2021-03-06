import type { Types } from '@graphql-codegen/plugin-helpers';
import type { TypeScriptTypedDocumentNodesConfig } from '@graphql-codegen/typed-document-node';
import type { TypeScriptPluginConfig } from '@graphql-codegen/typescript';
import type { TypeScriptDocumentsPluginConfig } from '@graphql-codegen/typescript-operations';
import type { RawTypesConfig } from '@graphql-codegen/visitor-plugin-common';
import type { IGraphQLConfig } from 'graphql-config';
import { createAndSelectConfig } from './api/src/@common/configs/helpers';

const apiEnv = createAndSelectConfig({
	envFilePath: `./api/.env`,
});

const tsCommonConfig: RawTypesConfig = {
	useTypeImports: true,
};

const codegen: Types.Config = {
	generates: {
		'client/src/graphql/@generated/index.ts': {
			plugins: [
				{
					typescript: {
						...tsCommonConfig,
					} as TypeScriptPluginConfig,
				},
				{
					'typescript-operations': {
						...tsCommonConfig,
					} as TypeScriptDocumentsPluginConfig,
				},
				{
					'typed-document-node': {
						...tsCommonConfig,
					} as TypeScriptTypedDocumentNodesConfig,
				},
			],
		},
	},
};

const config: IGraphQLConfig = {
	schema: `http://localhost:${apiEnv.PORT ?? 3000}/graphql`,
	documents: 'client/src/graphql/**/*.graphql',
	extensions: {
		codegen,
	},
};

export default config;
