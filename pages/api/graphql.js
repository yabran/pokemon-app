import {  ApolloServer } from "apollo-server-micro";
import {ApolloServerPluginLandingPageGraphQLPlayground} from "apollo-server-core";
import {typeDefs} from './typeDefs/typeDefs';
import {resolvers} from './resolvers/resolvers';
import Cors from 'micro-cors'


const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    playground: true,
    plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
});

const startServer = apolloServer.start();

export default async function handler(req, res) {
    await startServer;
    await apolloServer.createHandler({
        path: "/api/graphql",
    })(req, res);
}

export const config = {
    api: {
        bodyParser: false,
    },
};

