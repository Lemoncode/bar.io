import { createEmptyListItem, ListItem } from 'common/components';
import {ProductPortionType, } from 'core/api/product-portions/product-portions.model';

export const mapProductPortionTypeApiModelsToListItems = (
  productPortionTypes: ProductPortionType[],
): ListItem<string>[] =>
  !!productPortionTypes
    ? productPortionTypes.map((e) => mapProductPortionTypeApiModelToListItem(e))
    : [];

export const mapProductPortionTypeApiModelToListItem = (
  productPortionType: ProductPortionType,
): ListItem<string> =>
  !!productPortionType
    ? { id: productPortionType.id, value: productPortionType.name }
    : createEmptyListItem();
