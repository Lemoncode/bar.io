import { gql } from 'apollo-server-express';

export const menuCategoryTypeDefs = gql`
  type Portion {
    id: ID!
    price: Float!
  }

  type Product {
    id: ID!
    name: String!
    visible: Boolean!
    description: String
    portionTypeId: ID
    portions: [Portion]
  }

  type MenuCategory {
    id: ID!
    name: String!
    products: [Product]  
  }

  extend type Query {
    getMenuCategories: [MenuCategory]!
    getMenuCategoryById(id: ID!): MenuCategory
    getMenuCategoryByProductId(id: ID!): MenuCategory
    getProductById(id: ID!): Product
  }

  input PortionInput {
    id: ID!
    price: Float!
  }

  input ProductInput {
    id: ID
    name: String!
    visible: Boolean!
    description: String
    portionTypeId: ID
    portions: [PortionInput]
  }  

  input MenuCategoryProductInput {
    id: ID!
    name: String!
    visible: Boolean!
    portionTypeId: ID
    portions: [PortionInput]
  } 

  input MenuCategoryInput {
    id: ID
    name: String!
    products: [MenuCategoryProductInput]    
  }

  extend type Mutation {
    saveMenuCategories(menuCategories: [MenuCategoryInput]): Boolean
    saveMenuCategory(menuCategory: MenuCategoryInput!): Boolean
    saveProduct(product: ProductInput!, categoryId: ID): Boolean
    saveProducts(categoryId: ID!, products: [ProductInput]!): Boolean
    deleteMenuCategory(id: ID!): Boolean
    deleteProduct(id: ID!): Boolean
  }
`;
