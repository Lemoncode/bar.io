import { MenuCategory, Product } from 'core/api';
import produce from 'immer';
import React from 'react';

interface UseMenuCategoriesHook {
  categories: Array<MenuCategory>;
  setCategories: (categories: Array<MenuCategory>) => void;
  selectedCategoryId: string;
  setSelectedCategoryId: (id: string) => void;
  updateSelectedCategoryProducts: (products: Array<Product>) => void;
  getProductsByCategoryId: (id: string) => Array<Product>;
}

export const useMenuCategories = (
  cat: Array<MenuCategory>,
  categoryId: string,
): UseMenuCategoriesHook => {
  const getProductsByCategoryId = (id: string): Array<Product> =>
    categories.filter((c) => c.id === id)[0]?.products ?? [];
  const [selectedCategoryId, setSelectedCategoryId] = React.useState<string>(categoryId);
  const [categories, setCategories] = React.useState<Array<MenuCategory>>(cat);

  const updateSelectedCategoryProducts = (prods: Array<Product>) => {
    const newCategories = produce(categories, (draft) => {
      draft.find((c) => c.id === selectedCategoryId).products = prods;
    });
    setCategories(newCategories);
  };

  return {
    categories,
    setCategories,
    selectedCategoryId,
    setSelectedCategoryId,
    updateSelectedCategoryProducts,
    getProductsByCategoryId,
  };
};
