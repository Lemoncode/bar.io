import { createMockRepository } from 'common/helpers';
import { MenuCategory, Product } from 'dals';
import { v4 as uuid4 } from 'uuid';

const menuCategoryRepository = createMockRepository<MenuCategory>(() =>
  uuid4()
);

export const getMenuCategories = async (): Promise<Array<MenuCategory>> =>
  menuCategoryRepository.getCollection();

export const getMenuCategoryById = async (id: string): Promise<MenuCategory> =>
  menuCategoryRepository.getItemById(id);

export const saveMenuCategory = async (
  menuCategory: MenuCategory
): Promise<void> => menuCategoryRepository.saveItem(menuCategory);

export const saveMenuCategories = async (
  categories: Array<MenuCategory>
): Promise<void> => menuCategoryRepository.setItems(categories);

export const getMenuCategoryByProductId = async (
  productId: string
): Promise<MenuCategory> => {
  const category = menuCategoryRepository
    .getCollection()
    .find((c) => c.products.some((p) => p._id == productId));

  return !!category ? { ...category } : null;
};

export const deleteMenuCategory = async (id: string): Promise<void> =>
  menuCategoryRepository.deleteItem(id);

export const getProductById = async (id: string): Promise<Product> => {
  const product = menuCategoryRepository
    .getCollection()
    .find((c) => c.products.some((p) => p._id == id))
    ?.products?.find((p) => p._id == id);

  return !!product ? { ...product } : null;
};

export const saveProduct = async (
  product: Product,
  categoryId?: string
): Promise<void> => {
  let menuCategory: MenuCategory;
  if (!!categoryId) {
    menuCategory = await getMenuCategoryById(categoryId);
  } else if (!!product._id) {
    menuCategory = await getMenuCategoryByProductId(product._id);
  }

  if (!!menuCategory) {
    const productRepository = createMockRepository<Product>(
      () => uuid4(),
      menuCategory.products
    );
    productRepository.saveItem(product);
    menuCategoryRepository.saveItem({
      ...menuCategory,
      products: productRepository.getCollection(),
    });
  }
};

export const saveProducts = async (
  categoryId: string,
  products: Array<Product>
): Promise<void> => {
  const menuCategory = await getMenuCategoryById(categoryId);

  if (!!menuCategory) {
    const updatedMenuCategory = { ...menuCategory, products: products };
    menuCategoryRepository.saveItem(updatedMenuCategory);
  }
};

export const deleteProduct = async (id: string): Promise<void> => {
  const category = await getMenuCategoryByProductId(id);

  if (!!category) {
    const productRepository = createMockRepository<Product>(
      () => false,
      category.products
    );
    productRepository.deleteItem(id);
    const updatedMenuCategory = menuCategoryRepository.saveItem({
      ...category,
      products: [...productRepository.getCollection()],
    });
  }
};

export const removeProductPortionFromProducts = async (
  productPortionId: string
): Promise<void> => {
  const menuCategories = menuCategoryRepository.getCollection();
  const updatedMenuCategories = menuCategories.map((mc) => ({
    ...mc,
    products: mc.products?.map((p) => ({
      ...p,
      portions: p.portions?.filter((pr) => pr._id != productPortionId),
    })),
  }));
  menuCategoryRepository.setItems(updatedMenuCategories);
};

export const removeProductPortionTypeFromProducts = async (
  productPortionTypeId: string
): Promise<void> => {
  const menuCategories = menuCategoryRepository.getCollection();
  const updatedMenuCategories = menuCategories.map((mc) => ({
    ...mc,
    products: mc.products?.map((p) => ({
      ...p,
      portionTypeId:
        p.portionTypeId === productPortionTypeId ? null : p.portionTypeId,
      portions: p.portionTypeId === productPortionTypeId ? null : p.portions,
    })),
  }));
  menuCategoryRepository.setItems(updatedMenuCategories);
};
