import { produce } from 'immer';

export interface Entity {
  _id: any;
}

export interface MockRepository<Entity> {
  getCollection: () => Entity[];
  saveItem: (item: Entity) => Entity;
  getItemById: (id: any) => Entity;
  getItemByPropValue: (propName: string, value: any) => Entity;
  setItems: (items: Entity[]) => Entity[];
  deleteItem: (id: any) => Entity[];
}

export function createMockRepository<T extends Entity>(
  idGenerator: () => any,
  initialCollection?: Array<T>
): MockRepository<T> {
  if (!idGenerator) throw 'An id generator must be provided';
  let collection = !!initialCollection ? [...initialCollection] : new Array();
  const getCollection = (): T[] => [...collection];

  const getItemById = (id: any): T => {
    if (!id) throw 'id cannot be empty';
    const item = collection.find((i) => i.id == id);
    return !!item ? { ...item } : null;
  };

  const getItemByPropValue = (propName: string, value: any) =>
    collection.find((o) => o[propName] == value);

  const saveItem = (item: T): T => {
    if (!item) throw 'item cannot be null or undefined';
    if (!!item._id && !!getItemById(item._id)) {
      collection = produce(collection, (newCollection) => {
        const index = newCollection.findIndex((c) => c.id === item._id);
        newCollection.splice(index, 1, { ...item });
      });
    } else {
      collection = produce(collection, (newCollection) => {
        item._id = idGenerator();
        newCollection.push({ ...item });
      });
    }

    return getItemById(item._id);
  };

  const setItems = (items: T[]): T[] => {
    if (!items) items = [];
    collection = produce(
      collection,
      (newCollection) => (newCollection = [...items])
    );
    return collection;
  };

  const deleteItem = (id: any): T[] => {
    if (!id) throw 'id cannot be empty';
    collection = produce(collection, (newCollection) => {
      newCollection.splice(
        newCollection.indexOf((i) => i.id == id),
        1
      );
      return newCollection;
    });
    return collection;
  };

  return {
    getCollection,
    getItemById,
    getItemByPropValue,
    saveItem,
    setItems,
    deleteItem,
  };
}
