import { gql } from "apollo-server-express";

import areasSchema from './areas';

const linkSchema = gql`
      type Query {
        _: Boolean
      }
    
      type Mutation {
        _: Boolean
      }
    `;
    
    export default [linkSchema, areasSchema];