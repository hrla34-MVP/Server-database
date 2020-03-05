import cors from 'cors';
import bodyParser from 'body-parser';
import express from 'express';
import mongoose from 'mongoose';
mongoose.Promise = global.Promise;
import { ApolloServer } from 'apollo-server-express';
import schema  from './gqlschema/index';
import resolvers from './resolvers/resolvers';

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded( {extended: true}));

const server = new ApolloServer({
    typeDefs: schema,
    resolvers,
});

server.applyMiddleware({
    app,
    path: '/graphql'
});
const url = 'mongodb://localhost:27017/graphql';
mongoose.connect(url, {newURLParser: true});

app.listen({
    port: 8000
}, () => {
    console.log('Apollo Server on http://localhost:8000/graphql');
});