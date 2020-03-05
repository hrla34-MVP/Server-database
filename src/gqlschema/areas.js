import { gql } from 'apollo-server-express';

  export default gql `

  type Area {
    name: String!
    latitude: Float!
    longitude: Float!
    radius: Int!
    enter: Enter
    exit: Exit
  }

  type Enter {
    bluetooth: Boolean
    notifications: [String]
  }

  type Exit {
    bluetooth: Boolean
    notifications: [String]
  }

  extend type Query {
    areas: [Area]
    area(name: String!): Area
  }

  extend type Mutation {
    createArea(name: String!, latitude: Float!, longitude: Float!, radius: Int!): Area
    updateArea(name: String!, latitude: Float, longitude: Float, radius: Int): Area
    deleteArea(name: String!): Area
    createEvent(name: String!, enter: Boolean!, exit: Boolean!, bluetooth: Boolean, notifications: String): Area
    deleteEvent(name: String!, enter: Boolean!, exit: Boolean!, bluetooth: Boolean, notifications: String): Area
  }

`
