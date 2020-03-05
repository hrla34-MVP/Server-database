import cors from 'cors';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import express from 'express';
import mongoose from 'mongoose';
mongoose.Promise = global.Promise;
import { ApolloServer } from 'apollo-server-express';
import models from './models/mockData';
import schema  from './gqlschema/index';
import resolvers from './resolvers/resolvers';

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded( {extended: true}));
// app.use(morgan('dev'));

const server = new ApolloServer({
    typeDefs: schema,
    resolvers,
    // context: {models}
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