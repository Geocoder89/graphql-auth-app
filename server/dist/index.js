import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import cors from 'cors';
import express from 'express';
import http from 'http';
import cookieParser from 'cookie-parser';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { readFileSync } from 'fs';
import dotenv from 'dotenv';
import resolvers from './resolvers/index.js';
import { getUser } from './helpers/getUser.js';
const app = express();
// app.use(verifyToken)
const httpServer = http.createServer(app);
dotenv.config();
const typeDefs = readFileSync('./schema.graphql', { encoding: 'utf-8' });
const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [
        ApolloServerPluginDrainHttpServer({
            httpServer
        })
    ]
});
await server.start();
app.use('/graphql', cors({
    origin: 'http://localhost:3000',
    credentials: true,
}), express.json(), cookieParser(), expressMiddleware(server, {
    context: async ({ req, res }) => {
        const token = req.headers.authorization || '';
        const user = await getUser(token.replace('Bearer ', ''));
        return { user, res, token };
    }
}));
// Modified server startup
await new Promise((resolve) => httpServer.listen({ port: 4000 }, resolve));
console.log(`🚀 Server ready at http://localhost:4000/`);
