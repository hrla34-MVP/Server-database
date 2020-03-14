require('dotenv').config();
import cors from 'cors';
import bodyParser from 'body-parser';
import express from 'express';
import mongoose from 'mongoose';
import { ApolloServer } from 'apollo-server-express';
import schema from './gqlschema/index';
import resolvers from './resolvers/resolvers';

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const server = new ApolloServer({
    typeDefs: schema,
    resolvers,
});

server.applyMiddleware({
    app,
    path: '/graphql'
});

const url = process.env.MONGODB_URI || 'mongodb://localhost/geofencing-notification';
mongoose.connect(url);

// UNCOMMENT THE FOLLOWING IF RUNNING LOCALLY FOR DEVELOPMENT/TESTING:
// const mongoURL = 'mongodb://localhost:27017/graphql';
// mongoose.connect(mongoURL, {newURLParser: true});

app.listen({
    port: process.env.PORT || 8000
}, () => {
    console.log('Apollo Server running!');
});