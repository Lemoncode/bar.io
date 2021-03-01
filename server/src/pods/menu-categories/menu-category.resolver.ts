import { GraphQLResolver } from 'common/models';
import { menuCategoryRepository } from 'dals';
import {
  mapFromMenuCategoryApiModelToModel,
  mapFromMenuCategoryModelToApiModel,
  mapFromProductApiModelToModel,
  mapFromProductModelToApiModel,
} from './menu-category.mapper';
import { MenuCategory, Product } from './menu-category.model';

interface MenuCategoryResolver {
  Query: {
    getMenuCategories: GraphQLResolver<Array<MenuCategory>>;
    getMenuCategoryById: GraphQLResolver<MenuCategory, { id: string }>;
    getMenuCategoryByProductId: GraphQLResolver<MenuCategory, { id: string }>;
    getProductById: GraphQLResolver<Product, { id: string }>;
  };
  Mutation: {
    saveMenuCategory: GraphQLResolver<boolean, { menuCategory: MenuCategory }>;
    saveMenuCategories: GraphQLResolver<
      boolean,
      { menuCategories: MenuCategory[] }
    >;
    saveProduct: GraphQLResolver<
      boolean,
      { product: Product; categoryId?: string }
    >;
    saveProducts: GraphQLResolver<
      boolean,
      { categoryId: string; products: Array<Product> }
    >;
    deleteMenuCategory: GraphQLResolver<boolean, { id: string }>;
    deleteProduct: GraphQLResolver<boolean, { id: string }>;
  };
}

export const menuCategoryResolver: MenuCategoryResolver = {
  Query: {
    getMenuCategories: async (
      parent,
      {},
      context
    ): Promise<Array<MenuCategory>> =>
      (await menuCategoryRepository.getMenuCategories())?.map((mc) =>
        mapFromMenuCategoryModelToApiModel(mc)
      ) ?? [],
    getMenuCategoryById: async (
      parent,
      { id },
      context
    ): Promise<MenuCategory> =>
      mapFromMenuCategoryModelToApiModel(
        await menuCategoryRepository.getMenuCategoryById(id)
      ),
    getMenuCategoryByProductId: async (
      parent,
      { id },
      context
    ): Promise<MenuCategory> =>
      mapFromMenuCategoryModelToApiModel(
        await menuCategoryRepository.getMenuCategoryByProductId(id)
      ),
    getProductById: async (parent, { id }, context): Promise<Product> =>
      mapFromProductModelToApiModel(
        await menuCategoryRepository.getProductById(id)
      ),
  },
  Mutation: {
    saveMenuCategory: async (
      parent,
      { menuCategory },
      context
    ): Promise<boolean> => {
      await menuCategoryRepository.saveMenuCategory(
        mapFromMenuCategoryApiModelToModel(menuCategory)
      );

      return true;
    },
    saveMenuCategories: async (
      parent,
      { menuCategories },
      context
    ): Promise<boolean> => {
      await menuCategoryRepository.saveMenuCategories(
        menuCategories?.map((mc) => mapFromMenuCategoryApiModelToModel(mc))
      );
      return true;
    },
    saveProduct: async (
      parent,
      { product, categoryId },
      context
    ): Promise<boolean> => {
      await menuCategoryRepository.saveProduct(
        mapFromProductApiModelToModel(product),
        categoryId
      );
      return true;
    },
    saveProducts: async (
      parent,
      { categoryId, products },
      context
    ): Promise<boolean> => {
      await menuCategoryRepository.saveProducts(
        categoryId,
        products.map((p) => mapFromProductApiModelToModel(p))
      );
      return true;
    },
    deleteMenuCategory: async (parent, { id }, context): Promise<boolean> => {
      await menuCategoryRepository.deleteMenuCategory(id);
      return true;
    },
    deleteProduct: async (parent, { id }, context): Promise<boolean> => {
      await menuCategoryRepository.deleteProduct(id);
      return true;
    },
  },
};
