export type ItemId = number | string;
export type ItemValue = number | string | boolean;

export interface ListItem<ItemId> {
  id: ItemId;
  value: ItemValue;
  visible?: boolean;
}

export const createEmptyListItem = <ItemId>(): ListItem<ItemId> => ({
  id: null,
  value: null,
});
