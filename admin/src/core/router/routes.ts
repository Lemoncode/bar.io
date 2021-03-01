import { generatePath } from 'react-router-dom';

interface SwitchRoutes {
  root: string;
  login: string;
  dashboard: string;
  barInfo: string;
  categoriesList: string;
  productList: string;
  editProduct: string;
  productPortionTypes: string;
  editPortions: string;
  qrCode: string;
}

export const switchRoutes: SwitchRoutes = {
  root: '/',
  login: '/login',
  dashboard: '/dashboard',
  barInfo: '/barInfo',
  categoriesList: '/categories',
  productList: '/products',
  editProduct: '/product/:productId?',
  productPortionTypes: '/productPortionTypes',
  editPortions: '/editPortions/:typeId',
  qrCode: '/qrCode',
};

interface Routes extends Omit<SwitchRoutes, 'editProduct' | 'editPortions'> {
  editProduct: (productId?: string) => string;
  editPortions: (typeId: string) => string;
}

export const routes: Routes = {
  ...switchRoutes,
  editProduct: (productId?: string) =>
    !!productId
      ? generatePath(switchRoutes.editProduct, { productId })
      : generatePath(switchRoutes.editProduct),
  editPortions: (typeId: string) => generatePath(switchRoutes.editPortions, { typeId }),
};
