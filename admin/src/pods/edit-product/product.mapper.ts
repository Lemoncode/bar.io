import * as apiModel from 'core/api/menu-categories/product.model';
import * as viewModel from './product.vm';


export const mapProductApiModelToViewModel = (product: apiModel.Product): viewModel.Product => ({
  id: product.id,
  categoryId: null,
  name: product.name,
  description: product.description,
  portionTypeId: product.portionTypeId,
  portions: mapPortionApiModelToPortionViewModels(product.portions),
  visible: product.visible,
});

export const mapProductViewModelToApiModel = (product: viewModel.Product): apiModel.Product => ({
  id: product.id,
  name: product.name,
  description: product.description,
  portionTypeId: product.portionTypeId,
  portions: mapPortionViewModelsToPortionApiModels(product.portions),
  visible: product.visible,
});

export const createEmptyProductVm = (): viewModel.Product => ({
  id: '',
  categoryId: '',
  name: '',
  description: '',
  portionTypeId: '',
  portions: [],
  visible: false,
});

const mapPortionViewModelsToPortionApiModels = (
  portions: Array<viewModel.Portion>,
): Array<apiModel.Portion> => portions.map(p => ({id: p.id, price: p.price}));

const mapPortionApiModelToPortionViewModels = (portions: Array<apiModel.Portion>): Array<viewModel.Portion> => portions?.map(p => ({...p, name: ''})) ?? [];
