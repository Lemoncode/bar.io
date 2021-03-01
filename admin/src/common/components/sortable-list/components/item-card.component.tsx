import {
  Card,
  CardActions,
  CardContent,
  IconButton,
  TextField,
  Typography,
} from '@material-ui/core';
import { Clear, Create, Delete, SaveAlt, Visibility, VisibilityOff } from '@material-ui/icons';
import React from 'react';
import * as classes from './item-card.styles';
import { ItemId, ItemValue } from '../list-item.vm';

interface ItemCardComponentProps<ItemId, ItemValue> {
  id?: ItemId;
  value?: ItemValue;
  visible?: boolean;
  edit: boolean;
  onDelete: (id: ItemId) => void;
  onEdit: (id: ItemId) => void;
  onSave?: (value: ItemValue, id?: ItemId) => void;
  onCancel?: () => void;
  onChangeVisibility?: (id: ItemId) => void;
}

export const ItemCardComponent: React.FunctionComponent<
  ItemCardComponentProps<ItemId, ItemValue>
> = (props) => {
  const minValueLength = 4;
  const {
    id,
    value,
    visible,
    edit,
    onDelete,
    onEdit,
    onSave,
    onCancel,
    onChangeVisibility,
  } = props;
  const [itemValue, setItemValue] = React.useState<ItemValue>(value);
  const [disableSave, setDisableSave] = React.useState<boolean>(false);
  const handleClickEdit = () => onEdit(id);
  const handleClickDelete = () => onDelete(id);
  const handleClickSave = () => {
    onSave(itemValue, id);
    setItemValue(itemValue);
  };
  const handleClickCancel = () => {
    setItemValue(value);
    onCancel();
  };
  const handleValueChange = (e) => {
    const newItemName = e.target.value;
    if (newItemName.trim().length === 0 || newItemName.length < minValueLength)
      setDisableSave(true);
    else if (newItemName.length >= minValueLength) setDisableSave(false);
    setItemValue(newItemName);
  };
  const handleChangeVisibility = () => onChangeVisibility(id);

  return (
    <Card className={classes.container}>
      <CardContent className={classes.card}>
        {edit ? (
          <TextField name='itemValue' value={itemValue} onChange={handleValueChange} />
        ) : (
          <Typography>{value ?? ''}</Typography>
        )}
      </CardContent>
      <CardActions disableSpacing>
        {edit ? (
          <IconButton aria-label='Guardar' onClick={handleClickSave} disabled={disableSave}>
            <SaveAlt />
          </IconButton>
        ) : (
          <IconButton aria-label={`Editar ${value}`} onClick={handleClickEdit}>
            <Create />
          </IconButton>
        )}
        {visible !== undefined && !edit && (
          <IconButton
            aria-label={`Hacer ${visible ? 'invisible' : 'visible'} ${value}`}
            onClick={handleChangeVisibility}>
            {visible ? <Visibility /> : <VisibilityOff />}
          </IconButton>
        )}
        {edit ? (
          <IconButton aria-label='Cancelar' onClick={handleClickCancel}>
            <Clear />
          </IconButton>
        ) : (
          <IconButton aria-label={`Borrar ${value}`} onClick={handleClickDelete}>
            <Delete />
          </IconButton>
        )}
      </CardActions>
    </Card>
  );
};
