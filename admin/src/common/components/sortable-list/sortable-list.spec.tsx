import React from 'react';
import { render, screen } from '@testing-library/react';
import { SortableListComponent } from './sortable-list.component';
import { ItemId, ItemValue } from './list-item.vm';

describe('SortableListComponent test', () => {
  it('should show the add button and a list of item cards when passed a valid list', () => {
    // Arrange
    const props = {
      items: [
        { id: '1', value: 'Entrantes' },
        { id: '2', value: 'Primeros' },
        { id: '3', value: 'Segundos' },
        { id: '4', value: 'Postres' },
        { id: '5', value: 'Bebidas' },
      ],
      onAdd: () => {
        return;
      },
      onCancel: () => {
        return;
      },
      onEdit: (id: ItemId) => {
        return;
      },
      onDelete: (id: ItemId) => {
        return;
      },
      onSave: (value: ItemValue, id?: ItemId) => {
        return;
      },
      onReorder: (startIndex: number, endIndex: number) => {
        return;
      },
    };

    // Act
    render(<SortableListComponent {...props} />);
    const addButton = screen.getByLabelText('Añadir');
    let cardAmount = 0;
    props.items.map((c) => (cardAmount += screen.queryAllByText(c.value).length));

    // Assert
    expect(addButton).toBeInTheDocument();
    expect(cardAmount).toBe(props.items.length);
  });
  it('should show the add button and a disclaimer message when passing an undefined items list', () => {
    // Arrange
    const props = {
      items: undefined,
      onAdd: () => {
        return;
      },
      onCancel: () => {
        return;
      },
      onEdit: (id: ItemId) => {
        return;
      },
      onDelete: (id: ItemId) => {
        return;
      },
      onSave: (value: ItemValue, id?: ItemId) => {
        return;
      },
      onReorder: (startIndex: number, endIndex: number) => {
        return;
      },
    };

    // Act
    render(<SortableListComponent {...props} />);
    const disclaimer = screen.getByText('No existen elementos');
    const buttonAmount = screen.queryAllByRole('button').length;

    // Assert
    expect(disclaimer).toBeInTheDocument();
    expect(buttonAmount).toBe(1);
  });
  it('should show "No existen elementos" when passing a null items list', () => {
    // Arrange
    const props = {
      items: undefined,
      onAdd: () => {
        return;
      },
      onCancel: () => {
        return;
      },
      onEdit: (id: ItemId) => {
        return;
      },
      onDelete: (id: ItemId) => {
        return;
      },
      onSave: (value: ItemValue, id?: ItemId) => {
        return;
      },
      onReorder: (startIndex: number, endIndex: number) => {
        return;
      },
    };

    // Act
    render(<SortableListComponent {...props} />);
    const disclaimer = screen.getByText('No existen elementos');
    const addButton = screen.getByLabelText('Añadir');

    // Assert
    expect(disclaimer).toBeInTheDocument();
    expect(addButton).toBeInTheDocument();
  });
  it('should show the add button and a disclaimer when passing a null items list', () => {
    // Arrange
    const props = {
      items: undefined,
      onAdd: () => {
        return;
      },
      onCancel: () => {
        return;
      },
      onEdit: (id: ItemId) => {
        return;
      },
      onDelete: (id: ItemId) => {
        return;
      },
      onSave: (value: ItemValue, id?: ItemId) => {
        return;
      },
      onReorder: (startIndex: number, endIndex: number) => {
        return;
      },
    };

    // Act
    render(<SortableListComponent {...props} />);
    const disclaimer = screen.getByText('No existen elementos');
    const addButton = screen.getByLabelText('Añadir');

    // Assert
    expect(disclaimer).toBeInTheDocument();
    expect(addButton).toBeInTheDocument();
  });
});
