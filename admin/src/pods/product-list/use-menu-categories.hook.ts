import { MenuCategory, Product } from 'core/api';
import produce from 'immer';
import React from 'react';

interface UseMenuCategoriesHook {
  categories: Array<MenuCategory>;
  setCategories: (categories: Array<MenuCategory>) => void;
  selectedCategoryId: number;
  products: Array<Product>;
  changeCategory: (id: number) => void;
  updateSelectedCategoryProducts: (products: Array<Product>) => void;
}

export const useMenuCategories = (
  cat: Array<MenuCategory>,
  categoryId: number,
): UseMenuCategoriesHook => {
  const getCategoryProductsByCategoryId = (id: number): Array<Product> =>
    categories.filter((c) => c.id === id)[0]?.products ?? [];
  const [selectedCategoryId, setSelectedCategoryId] = React.useState<number>(categoryId);
  const [categories, setCategories] = React.useState<Array<MenuCategory>>(cat);
  const [products, setProducts] = React.useState<Array<Product>>(
    !!selectedCategoryId ? getCategoryProductsByCategoryId(selectedCategoryId) : [],
  );

  const updateSelectedCategoryProducts = (prods: Array<Product>) => {
    setProducts(prods);
    const newCategories = produce(categories, (draft) => {
      draft.find((c) => c.id === selectedCategoryId).products = prods;
    });
    setCategories(newCategories);
  };

  const changeCategory = (id: number) => {
    setSelectedCategoryId(id);
    setProducts(getCategoryProductsByCategoryId(id));
  };

  return {
    categories,
    setCategories,
    selectedCategoryId,
    products,
    changeCategory,
    updateSelectedCategoryProducts,
  };
};