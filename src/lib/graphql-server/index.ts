import { graphql } from 'graphql';
import type { ExecutionResult } from 'graphql/execution/execute';
import type { Maybe } from 'graphql/jsutils/Maybe';
import { rootValue } from './resolvers';
import { schema } from './schema';

export function resolveRequest(
	source: string,
	variableValues?: Maybe<{
		readonly [variable: string]: unknown;
	}>,
): Promise<ExecutionResult> {
	return graphql({
		schema,
		source,
		variableValues,
		rootValue,
	});
}
