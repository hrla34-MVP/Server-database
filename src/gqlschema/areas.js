import { gql } from 'apollo-server-express';

  export default gql `

  type Area {
    name: String!
    latitude: Float!
    longitude: Float!
    radius: Int!
    enter: Boolean!
    exit: Boolean!
    title: String
    body: String
  }

  extend type Query {
    areas: [Area]
    area(name: String!): Area
  }

  extend type Mutation {
    createArea(name: String!, latitude: Float!, longitude: Float!, radius: Int!, enter: Boolean!, exit: Boolean!, title: String!, body: String!): Area
    updateArea(name: String!, latitude: Float, longitude: Float, radius: Int): Area
    deleteArea(name: String!): Area
    updateEvent(name: String!, enter: Boolean, exit: Boolean, title: String, body: String): Area
    deleteEvent(name: String!): Area
  }

`
