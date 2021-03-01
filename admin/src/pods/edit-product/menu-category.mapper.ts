import * as apiModel from 'core/api';
import * as viewModel from './menu-category.vm';

export const mapMenuCategoryApiModelsToViewModels = (
  categories: Array<apiModel.MenuCategory>,
): Array<viewModel.MenuCategory> =>
  !!categories ? categories.map((c) => mapMenuCategoryApiModelToViewModel(c)) : [];

export const mapMenuCategoryApiModelToViewModel = (
  category: apiModel.MenuCategory,
): viewModel.MenuCategory =>
  !!category ? { id: category.id, name: category.name } : createEmptyMenuCategoryVm();

export const createEmptyMenuCategoryVm = (): viewModel.MenuCategory => ({
  id: '',
  name: '',
});
