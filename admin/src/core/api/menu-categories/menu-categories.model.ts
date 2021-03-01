import { Product } from './product.model';

export interface MenuCategory {
  id: string;
  name: string;
  products: Array<Product>;
}

export const createEmptyMenuCategory = (): MenuCategory => ({
  id: '',
  name: '',
  products: [],
});
