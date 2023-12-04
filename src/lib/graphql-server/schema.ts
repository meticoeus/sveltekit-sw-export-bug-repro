import { buildSchema } from 'graphql';
import { gql } from 'graphql-request';
import { GraphQLJSON } from 'graphql-scalars';

export const schema = buildSchema(gql`
	type Query {
		hello: String
		counter: Int
	}

	type Mutation {
		increment: Int
		decrement: Int
	}

	scalar JSON
`);

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
Object.assign(schema._typeMap.JSON, GraphQLJSON);
