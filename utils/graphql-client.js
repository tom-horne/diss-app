import { GraphQLClient } from 'graphql-request';

export function graphQLClient({ query, variables, preview }) {

const endpoint = `${process.env.NEXT_PUBLIC_STRAPI}/graphql`;

const client = new GraphQLClient(endpoint, {
  headers: {
    'Content-Type': 'application/json',
  }
});

return client.request(query, variables);
}