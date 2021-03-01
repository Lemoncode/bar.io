import React from 'react';
import { mapProductPortionTypeApiModelsToListItems } from './product-portion-types.mapper';
import { reorder } from 'common/utils/array';
import { useHistory } from 'react-router-dom';
import { routes } from 'core/router';
import { deleteProductPortionType, getProductPortionTypes, saveProductPortionType } from 'core/api';
import { ListItem } from 'common/components';
import { ProductPortionTypesComponent } from './product-portion-types.component';

export const ProductPortionTypesContainer: React.FunctionComponent = () => {
  const history = useHistory();
  const [items, setItems] = React.useState<ListItem<string>[]>([]);
  const [adding, setAdding] = React.useState<boolean>(false);
  const [selectedProductPortionTypeId, setSelectedProductPortionTypeId] = React.useState<string>(
    '',
  );

  React.useEffect(() => {
    onLoadProductPortionTypes();
  }, []);

  const onLoadProductPortionTypes = async () => {
    const productPortionTypes = await getProductPortionTypes();
    setItems(mapProductPortionTypeApiModelsToListItems(productPortionTypes));
  };

  const handleReorder = (startIndex: number, endIndex: number) =>
    setItems(reorder(items, startIndex, endIndex));

  const handleSave = async (name: string, id?: string) => {
    await saveProductPortionType({ id: id, name: name });
    const types = await getProductPortionTypes();
    setAdding(false);
    setSelectedProductPortionTypeId('');
    setItems(mapProductPortionTypeApiModelsToListItems(types));
  };

  const handleDelete = async (id: string) => {
    await deleteProductPortionType(id);
    const types = await getProductPortionTypes();
    setSelectedProductPortionTypeId('');
    setItems(mapProductPortionTypeApiModelsToListItems(types));
  };

  const handleEdit = (id: string) => {
    history.push(routes.editPortions(id.toString()));
  };

  const handleCancel = () => setSelectedProductPortionTypeId('');
  const handleAdd = () => {
    setSelectedProductPortionTypeId('');
    setAdding(true);
  }

  return (
    <ProductPortionTypesComponent
      adding={adding}
      items={items}
      editItemId={selectedProductPortionTypeId}
      onSave={handleSave}
      onEdit={handleEdit}
      onDelete={handleDelete}
      onCancel={handleCancel}
      onAdd={handleAdd}
      onReorder={handleReorder}
    />
  );
};
