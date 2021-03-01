import { MenuCategory, Product } from 'core/api';
import { ListItem } from 'common/components/sortable-list/list-item.vm';
import { createEmptyListItem } from 'common/components/sortable-list/list-item.vm';

export const mapMenuCategoriesToListItems = (categories: Array<MenuCategory>): Array<ListItem<string>> =>
  !!categories ? categories.map((c) => mapMenuCategoryToListItem(c)) : [];

export const mapMenuCategoryToListItem = (menuCategory: MenuCategory): ListItem<string> =>
  !!menuCategory ? { id: menuCategory.id, value: menuCategory.name } : createEmptyListItem();

export const mapProductsToListItems = (products: Array<Product>): Array<ListItem<string>> =>
  !!products ? products?.map((d) => mapProductToListItem(d)) : [];

export const mapProductToListItem = (product: Product): ListItem<string> =>
  !!product
    ? {
        id: product.id,
        value: product.name,
        visible: product.visible,
      }
    : { ...createEmptyListItem(), visible: true };
