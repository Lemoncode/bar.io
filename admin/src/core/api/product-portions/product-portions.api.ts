import { gql } from 'graphql-request';
import { apiClient } from '../client';
import { ProductPortion, ProductPortionType } from './product-portions.model';

export const getProductPortionTypes = async (): Promise<Array<ProductPortionType>> =>
  await apiClient<Array<ProductPortionType>>(gql`
    query {
      getProductPortionTypes {
        id
        name
        portions {
          id
          name
        }
      }
    }
  `);

export const getProductPortionTypeById = async (id: string): Promise<ProductPortionType> =>
  await apiClient<ProductPortionType>(
    gql`
      query($id: ID!) {
        getProductPortionTypeById(id: $id) {
          id
          name
          portions {
            id
            name
          }
        }
      }
    `,
    {
      id: id,
    },
  );

export const saveProductPortionType = async (
  productPortionType: ProductPortionType,
): Promise<boolean> =>
  await apiClient<boolean>(
    gql`
      mutation($productPortionType: ProductPortionTypeInput!) {
        saveProductPortionType(productPortionType: $productPortionType)
      }
    `,
    { productPortionType: productPortionType },
  );

export const saveProductPortion = async (
  productPortion: ProductPortion,
  productPortionTypeId?: string,
): Promise<boolean> => {
  await apiClient<boolean>(
    gql`
      mutation($productPortion: ProductPortionInput!, $productPortionTypeId: ID) {
        saveProductPortion(productPortion: $productPortion, productPortionTypeId: $productPortionTypeId)
      }
    `,
    { productPortion: productPortion, productPortionTypeId: productPortionTypeId },
  );
  return true;
};

export const deleteProductPortionType = async (id: string): Promise<boolean> => {
  await apiClient<boolean>(
    gql`
      mutation($id: ID!) {
        deleteProductPortionType(id: $id)
      }
    `,
    { id: id },
  );
  return true;
};

export const deleteProductPortion = async (id: string): Promise<boolean> => {
  await apiClient<boolean>(
    gql`
      mutation($id: ID!) {
        deleteProductPortion(ID: $ID)
      }
    `,
    { id: id },
  );
  return true;
};
