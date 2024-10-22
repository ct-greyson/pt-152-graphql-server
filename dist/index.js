import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { typeDefs } from './schema.js';
import { resolvers } from './resolvers.js';
const server = new ApolloServer({
    //typeDefs - our schema ie the definitions of our data
    typeDefs,
    //resolvers - functions that handle our requests (queries/mutations) for interacting with our database and returning our data
    resolvers
});
const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
});
console.log(`🚀  Server ready at: ${url}`);
