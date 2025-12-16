import { gql } from "graphql-tag";

export const typeDefs = gql`
  type AuthPayload {
    accessToken: String!
    refreshToken: String!
    user: User!
  }

  type User {
    id: ID!
    email: String!
  }

  type Query {
    me: User
  }

  type Mutation {
    register(email: String!, password: String!): Boolean!
    activate(token: String!): Boolean!
    login(email: String!, password: String!): AuthPayload!
  }
`;
