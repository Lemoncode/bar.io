import { Card, CardContent, CardHeader } from '@material-ui/core';
import { SortableListComponent } from 'common/components/sortable-list';
import { ListItem } from 'common/components/sortable-list';
import { reorder } from 'common/utils/array';
import React from 'react';
import * as classes from './edit-portions.styles';
import { mapProductPortionsToListItems } from './edit-portions.mapper';
import {
  createEmptyProductPortionType,
  deleteProductPortion,
  getProductPortionTypeById,
  ProductPortionType,
  saveProductPortion,
  saveProductPortionType,
} from 'core/api';
import { useParams } from 'react-router-dom';

interface Params {
  typeId: string;
}

export const EditPortionsContainer: React.FunctionComponent = () => {
  const [listItems, setListItems] = React.useState<Array<ListItem<string>>>([]);
  const [productPortionType, setProductPortionType] = React.useState<ProductPortionType>(
    createEmptyProductPortionType(),
  );
  const [editedProductPortionId, setEditedProductPortionId] = React.useState<string>('');
  const [adding, setAdding] = React.useState<boolean>(false);
  const { typeId } = useParams<Params>();

  const getProductPortionType = async () => {
    const productPortionType = await getProductPortionTypeById(typeId);
    setProductPortionType(productPortionType);
    setListItems(mapProductPortionsToListItems(productPortionType.portions));
  };

  React.useEffect(() => {
    async function loadProductPortionType() {
      await getProductPortionType();
    }
    loadProductPortionType();
  }, []);

  const onReorder = async (startIndex, endIndex) => {
    const productPortions = productPortionType.portions;
    const reorderedPortions = reorder(productPortions, startIndex, endIndex);
    await saveProductPortionType({ ...productPortionType, portions: reorderedPortions });
    await getProductPortionType();
  };

  const onSave = (name: string, id?: string) => {
    setAdding(false);
    setEditedProductPortionId('');
    (async () => await saveProductPortion({ id: id, name: name }, productPortionType.id))();
    (async () => await getProductPortionType())();
  };

  const onEdit = (id: string) => setEditedProductPortionId(id);
  const onDelete = (id: string) => {
    (async () => await deleteProductPortion(id))();
    (async () => await getProductPortionType())();
  };

  const onCancel = () => {
    setAdding(false);
    setEditedProductPortionId('');
  }
  const onAdd = () => {
    setAdding(true);
    setEditedProductPortionId('');
  }

  return (
    <div className={classes.container}>
      <Card>
        <CardHeader component='h1' title={`Editar ${productPortionType.name}`} />
        <CardContent>
          <SortableListComponent
            adding={adding}
            items={listItems}
            itemTypeName={`${productPortionType.name}`}
            editItemId={editedProductPortionId}
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
