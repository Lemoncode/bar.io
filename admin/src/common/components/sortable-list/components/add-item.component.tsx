import { IconButton } from '@material-ui/core';
import { AddCircleOutlined } from '@material-ui/icons';
import React from 'react';
import { ItemCardComponent } from './item-card.component';
import { ItemId, ItemValue } from '../list-item.vm';

interface AddItemComponentProps<ItemId, ItemValue> {
  id?: ItemId;
  value?: ItemValue;
  onCancel: () => void;
  onSave: (value: ItemValue, id?: ItemId) => void;
  onAdd: () => void;
  adding: boolean;
}

export const AddItemComponent: React.FunctionComponent<AddItemComponentProps<ItemId, ItemValue>> = (
  props,
) => {
  const { id, value, onCancel, onSave, onAdd, adding } = props;
  return (
    <>
      <IconButton aria-label='Añadir' onClick={onAdd} disabled={adding}>
        <AddCircleOutlined fontSize='large' />
      </IconButton>
      {adding && (
        <ItemCardComponent
          value=''
          edit={true}
          onEdit={() => {
            return;
          }}
          onDelete={() => {
            return;
          }}
          onCancel={onCancel}
          onSave={onSave}
        />
      )}
    </>
  );
};
