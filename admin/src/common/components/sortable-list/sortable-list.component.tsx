import { List, ListItem, RootRef, Typography } from '@material-ui/core';
import React from 'react';
import { AddItemComponent, ItemCardComponent } from './components';
import { ListItem as Item } from './list-item.vm';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import * as classes from './sortable-list.styles';
import { ItemId, ItemValue } from './list-item.vm';

interface SortableListComponentProps<ItemId> {
  items: Array<Item<ItemId>>;
  itemTypeName?: string;
  editItemId?: ItemId;
  adding?: boolean;
  onDelete: (id: ItemId) => void;
  onEdit: (id: ItemId) => void;
  onSave?: (value: ItemValue, id?: ItemId) => void;
  onAdd: () => void;
  onCancel?: () => void;
  onChangeVisibility?: (id: ItemId) => void;
  onReorder: (startIndex: number, endIndex: number) => void;
}

export const SortableListComponent: React.FunctionComponent<SortableListComponentProps<ItemId>> = (
  props,
) => {
  const {
    items,
    itemTypeName,
    editItemId,
    adding,
    onSave,
    onCancel,
    onEdit,
    onDelete,
    onReorder,
    onAdd,
    onChangeVisibility,
  } = props;

  const handleDragEnd = (result) => {
    if (!!result.destination) onReorder(result.source.index, result.destination.index);
    else return;
  };
  return (
    <>
      <AddItemComponent adding={adding} onAdd={onAdd} onSave={onSave} onCancel={onCancel} />
      {(!items || items.length === 0) && !adding && !editItemId && (
        <Typography align='center' component='span'>{`No existen ${
          itemTypeName ?? 'elementos'
        }`}</Typography>
      )}
      {!!items && items.length > 0 ? (
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId='droppable'>
            {(provided) => (
              <RootRef rootRef={provided.innerRef}>
                <List>
                  {items.map((i, index) => (
                    <Draggable
                      isDragDisabled={!!editItemId}
                      key={i.id}
                      draggableId={`${i.id}`}
                      index={index}>
                      {(provided) => (
                        <ListItem
                          className={classes.item}
                          ref={provided.innerRef}
                          ContainerComponent='li'
                          ContainerProps={{ ref: provided.innerRef }}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}>
                          <ItemCardComponent
                            id={i.id}
                            value={i.value}
                            visible={i.visible}
                            edit={editItemId === i.id}
                            onEdit={onEdit}
                            onDelete={onDelete}
                            onCancel={onCancel}
                            onSave={onSave}
                            onChangeVisibility={onChangeVisibility}
                          />
                        </ListItem>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </List>
              </RootRef>
            )}
          </Droppable>
        </DragDropContext>
      ) : (
        ''
      )}
    </>
  );
};
