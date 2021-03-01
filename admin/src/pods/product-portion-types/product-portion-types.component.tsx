import React from 'react';
import { Card, CardContent, CardHeader } from '@material-ui/core';
import { SortableListComponent } from 'common/components/sortable-list';
import { ListItem } from 'common/components/sortable-list';
import * as classes from './product-portion-types.styles';

interface Props {
  items: ListItem<string>[];
  editItemId: string;
  adding: boolean;
  onSave: (value: string, id?: string) => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onReorder: (start: number, end: number) => void;
  onCancel: () => void;
  onAdd: () => void;
}

export const ProductPortionTypesComponent: React.FunctionComponent<Props> = (props) => {
  const { items, editItemId, adding, onSave, onEdit, onDelete, onReorder, onCancel, onAdd } = props;
  return (
    <>
      <div className={classes.container}>
        <Card>
          <CardHeader component='h1' title='Raciones' />
          <CardContent>
            <SortableListComponent
              adding={adding}
              items={items}
              itemTypeName='raciones'
              editItemId={editItemId}
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
    </>
  );
};
