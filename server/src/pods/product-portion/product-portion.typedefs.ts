import { gql } from 'apollo-server-express';

export const productPortionTypeTypeDefs = gql`
  type ProductPortion {
    id: ID!
    name: String!
  }

  type ProductPortionType {
    id: ID!
    name: String!
    portions: [ProductPortion]
  }

  extend type Query {
    getProductPortionTypes: [ProductPortionType]!
    getProductPortionTypeById(id: ID!): ProductPortionType
  }

  input ProductPortionInput {
    id: ID
    name: String!
  }

  input ProductPortionTypeInput {
    id: ID
    name: String!
    portions: [ProductPortionInput]
  }

  extend type Mutation {
    saveProductPortionType(productPortionType: ProductPortionTypeInput!): Boolean
    saveProductPortionTypes(productPortionTypes: [ProductPortionTypeInput]!): Boolean
    saveProductPortion(productPortion: ProductPortionInput!, productPortionTypeId: ID): Boolean    
    deleteProductPortionType(id: ID!): Boolean
    deleteProductPortion(id: ID!): Boolean
  }
`;
