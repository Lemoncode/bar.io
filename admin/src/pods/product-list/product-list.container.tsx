import { deleteProduct, deleteProductPortionType, getMenuCategories, getMenuCategoryById, getMenuCategoryByProductId, getProductById, saveProduct, saveProducts } from 'core/api';
import { routes } from 'core/router';
import {
  mapMenuCategoriesToListItems,
  mapProductsToListItems,
} from 'pods/categories-list/categories-list.mapper';
import React from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { ProductListComponent } from './product-list.component';
import { useMenuCategories } from './use-menu-categories.hook';
import * as classes from './product-list.styles';
import { reorder } from 'common/utils/array';

interface Params {
  categoryId?: string;
}

export const ProductListContainer: React.FunctionComponent = () => {
  const { categoryId } = useParams<Params>();
  const {
    categories,
    setCategories,
    selectedCategoryId,
    setSelectedCategoryId,
    updateSelectedCategoryProducts,
    getProductsByCategoryId,
  } = useMenuCategories([], categoryId);
  const history = useHistory();

  const onAddProduct = () => {
    history.push(routes.editProduct());
  };

  const onCancelProductEdit = () => {
    history.push(routes.productList);
  };

  const onChangeCategory = (id: string) => {
    setSelectedCategoryId(id);
  }

  const onChangeProductVisibility = async (id: string) => {
    const product = await getProductById(id);    
    product.visible = !product.visible;
    await saveProduct(product);
    const category = await getMenuCategoryById(selectedCategoryId);
    updateSelectedCategoryProducts(category.products);
  };

  const onReorderProducts = async (startIndex: number, endIndex: number) => {
    const products = getProductsByCategoryId(selectedCategoryId);
    const newProducts = reorder(products, startIndex, endIndex);    
    updateSelectedCategoryProducts(newProducts);
    await saveProducts(selectedCategoryId, newProducts);
  };

  const onDeleteProduct = async (id: string) => {
    await deleteProduct(id);
    const menuCategory = await getMenuCategoryById(selectedCategoryId);
    updateSelectedCategoryProducts(menuCategory.products);
  };

  const onEditProduct = (productId: string) => history.push(routes.editProduct(`${productId}`));

  const loadData = async () => {
    const menuCategories = await getMenuCategories(true);
    setCategories(menuCategories);
  };

  React.useEffect(() => {
    async function load() {
      await loadData();
    }
    load();
  }, []);

  return (
    <div className={classes.container}>
      <ProductListComponent
        categories={mapMenuCategoriesToListItems(categories)}
        products={mapProductsToListItems(getProductsByCategoryId(selectedCategoryId))}
        selectedCategoryId={selectedCategoryId}
        onAddProduct={onAddProduct}
        onCancelProductEdit={onCancelProductEdit}
        onChangeCategory={onChangeCategory}
        onChangeProductVisibility={onChangeProductVisibility}
        onDeleteProduct={onDeleteProduct}
        onEditProduct={onEditProduct}
        onReorderProducts={onReorderProducts}
      />
    </div>
  );
};
