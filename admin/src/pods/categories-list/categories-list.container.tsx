import { Card, CardContent, CardHeader } from '@material-ui/core';
import { ListItem, SortableListComponent } from 'common/components/sortable-list';
import { reorder } from 'common/utils/array';
import React from 'react';
import { deleteMenuCategory, getMenuCategories, MenuCategory, saveMenuCategories, saveMenuCategory } from 'core/api';
import { mapMenuCategoriesToListItems } from './categories-list.mapper';
import * as classes from './categories-list.styles';

export const CategoriesListContainer: React.FunctionComponent = () => {
  const [categories, setCategories] = React.useState<Array<MenuCategory>>([]);
  const [listItems, setListItems] = React.useState<Array<ListItem<string>>>([]);
  const [editCategoryId, setEditCategoryId] = React.useState<string>('');
  const [adding, setAdding] = React.useState<boolean>(false);

  const getCategories = async () => {
    const menuCategories = await getMenuCategories();
    setCategories(menuCategories);
    setListItems(mapMenuCategoriesToListItems(menuCategories));
  };

  React.useEffect(() => {
    async function loadCategories() {
      await getCategories();
    }
    loadCategories();
  }, []);

  const onReorder = async (startIndex, endIndex) => {
    const reorderedCategories = reorder(categories, startIndex, endIndex);
    setCategories(reorderedCategories);    
    setListItems(mapMenuCategoriesToListItems(reorderedCategories));
    await saveMenuCategories(reorderedCategories);
  }

  const onSave = (name: string, id?: string) => {
    setEditCategoryId('');
    setAdding(false);
    (async () => await saveMenuCategory(name, id))();
    (async () => await getCategories())();
  };

  const onEdit = (id: string) => {
    setEditCategoryId(id);
    setAdding(false);
  }
  const onDelete = (id: string) => {
    (async () => await deleteMenuCategory(id))();
    (async () => await getCategories())();
  };

  const onCancel = () => {
    setEditCategoryId('');
    setAdding(false);
  }

  const onAdd = () => {
    setEditCategoryId('');
    setAdding(true);
  }

  return (
    <div className={classes.container}>
      <Card>
        <CardHeader component='h1' title='Categorías' />
        <CardContent>
          <SortableListComponent
            items={listItems}
            itemTypeName='categorías'
            adding={adding}
            editItemId={editCategoryId}
            onSave={onSave}
            onEdit={onEdit}
            onDelete={onDelete}
            onReorder={onReorder}
            onCancel={onCancel}
            onAdd={onAdd}
          />
        </CardContent>
      </Card>
    </div>
  );
};
