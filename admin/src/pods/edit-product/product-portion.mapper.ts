import * as apiModel from 'core/api/product-portions/product-portions.model';
import * as viewModel from './product-portion.vm';

export const mapProductPortionApiModelsToViewModels = (
  productPortions: Array<apiModel.ProductPortion>,
): Array<viewModel.ProductPortion> =>
  productPortions?.map((p) => mapProductPortionApiModelToViewModel(p)) ?? [];

const mapProductPortionApiModelToViewModel = (
  productPortion: apiModel.ProductPortion,
): viewModel.ProductPortion => ({ ...productPortion, price: 0 });

export const mapProductPortionTypeApiModelsToViewModels = (
  productPortionTypes: Array<apiModel.ProductPortionType>,
): Array<viewModel.ProductPortionType> =>
  productPortionTypes?.map((t) => mapProductPortionTypeApiModelToViewModel(t)) ?? [];

const mapProductPortionTypeApiModelToViewModel = (
  productPortionType: apiModel.ProductPortionType,
): viewModel.ProductPortionType => ({
  id: productPortionType.id,
  name: productPortionType.name,
});
