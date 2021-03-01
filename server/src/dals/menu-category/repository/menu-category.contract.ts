import { MenuCategory, Product } from 'dals';

export interface MenuCategoryRepositoryContract {
  getMenuCategories: () => Promise<Array<MenuCategory>>;
  getMenuCategoryById: (id: string) => Promise<MenuCategory>;
  getMenuCategoryByProductId: (productId: string) => Promise<MenuCategory>;
  saveMenuCategory: (menuCategory: MenuCategory) => Promise<boolean>;
  saveMenuCategories: (menuCategories: MenuCategory[]) => Promise<boolean>;
  getProductById: (id: string) => Promise<Product>;
  saveProduct: (product: Product, categoryId?: string) => Promise<boolean>;
  saveProducts: (
    categoryId: string,
    products: Array<Product>
  ) => Promise<boolean>;
  deleteMenuCategory: (id: string) => Promise<boolean>;
  deleteProduct: (id: string) => Promise<boolean>;
  removeProductPortionFromProducts: (
    productPortionId: string
  ) => Promise<boolean>;
  removeProductPortionTypeFromProducts: (
    productPortionTypeId: string
  ) => Promise<boolean>;
}
