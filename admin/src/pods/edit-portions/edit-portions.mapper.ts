import { ProductPortion } from 'core/api';
import { ListItem } from 'common/components/sortable-list/list-item.vm';
import { createEmptyListItem } from 'common/components/sortable-list/list-item.vm';

export const mapProductPortionsToListItems = (
  productPortions: Array<ProductPortion>,
): Array<ListItem<string>> =>
  !!productPortions ? productPortions.map((ps) => mapProductPortionToListItem(ps)) : [];

export const mapProductPortionToListItem = (productPortion: ProductPortion): ListItem<string> =>
  !!productPortion ? { id: productPortion.id, value: productPortion.name } : createEmptyListItem();
