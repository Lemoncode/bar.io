import { GraphQLResolver } from 'common/models';
import { productPortionTypeRepository, menuCategoryRepository } from 'dals';
import {
  mapFromProductPortionApiModelToModel,
  mapFromProductPortionTypeApiModelToModel,
  mapFromProductPortionTypeModelToApiModel,
} from './product-portion.mapper';
import { ProductPortion, ProductPortionType } from './product-portion.model';

interface ProductPortionTypeResolver {
  Query: {
    getProductPortionTypes: GraphQLResolver<Array<ProductPortionType>>;
    getProductPortionTypeById: GraphQLResolver<
      ProductPortionType,
      { id: string }
    >;
  };
  Mutation: {
    saveProductPortionType: GraphQLResolver<
      boolean,
      { productPortionType: ProductPortionType }
    >;
    saveProductPortionTypes: GraphQLResolver<
      boolean,
      { productPortionTypes: Array<ProductPortionType> }
    >;
    saveProductPortion: GraphQLResolver<
      boolean,
      { productPortion: ProductPortion; productPortionTypeId?: string }
    >;
    deleteProductPortionType: GraphQLResolver<boolean, { id: string }>;
    deleteProductPortion: GraphQLResolver<boolean, { id: string }>;
  };
}

export const productPortionTypeResolver: ProductPortionTypeResolver = {
  Query: {
    getProductPortionTypes: async (
      parent,
      {},
      context
    ): Promise<Array<ProductPortionType>> =>
      (await productPortionTypeRepository.getProductPortionTypes())?.map((p) =>
        mapFromProductPortionTypeModelToApiModel(p)
      ) ?? [],
    getProductPortionTypeById: async (
      parent,
      { id },
      context
    ): Promise<ProductPortionType> =>
      mapFromProductPortionTypeModelToApiModel(
        await productPortionTypeRepository.getProductPortionTypeById(id)
      ),
  },
  Mutation: {
    saveProductPortionType: async (
      parent,
      { productPortionType },
      context
    ): Promise<boolean> => {
      await productPortionTypeRepository.saveProductPortionType(
        mapFromProductPortionTypeApiModelToModel(productPortionType)
      );
      return true;
    },
    saveProductPortionTypes: async (
      parent,
      { productPortionTypes },
      context
    ): Promise<boolean> => {
      await productPortionTypeRepository.saveProductPortionTypes(
        productPortionTypes?.map((t) =>
          mapFromProductPortionTypeApiModelToModel(t)
        ) ?? []
      );
      return true;
    },
    saveProductPortion: async (
      parent,
      { productPortion, productPortionTypeId },
      context
    ): Promise<boolean> => {
      await productPortionTypeRepository.saveProductPortion(
        mapFromProductPortionApiModelToModel(productPortion),
        productPortionTypeId
      );
      return true;
    },
    deleteProductPortionType: async (
      parent,
      { id },
      context
    ): Promise<boolean> => {
      await productPortionTypeRepository.deleteProductPortionType(id);
      return true;
    },
    deleteProductPortion: async (parent, { id }, context): Promise<boolean> => {
      await productPortionTypeRepository.deleteProductPortion(id);
      return true;
    },
  },
};
