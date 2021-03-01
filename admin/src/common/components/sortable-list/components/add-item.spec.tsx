import React from 'react';
import { render, screen } from '@testing-library/react';
import { AddItemComponent } from './add-item.component';
import userEvent from '@testing-library/user-event';
import { ItemId, ItemValue } from '../list-item.vm';

describe('AddItemComponent tests', () => {
  it('should show the edition component when adding', () => {
    // Arrange
    const props = {
      adding: true,
      onCancel: () => {
        return;
      },
      onSave: (value: ItemValue, id?: ItemId) => {
        return;
      },
      onAdd: () => {
        return;
      },
    };

    // Act
    render(<AddItemComponent {...props} />);
    const addButton = screen.getByLabelText('Añadir');
    const textField = screen.getByRole('textbox');
    const saveButton = screen.getByLabelText('Guardar');
    const cancelButton = screen.getByLabelText('Cancelar');

    // Assert
    expect(addButton).toBeInTheDocument();
    expect(textField).toBeInTheDocument();
    expect(saveButton).toBeInTheDocument();
    expect(cancelButton).toBeInTheDocument();
  });
  it('should not show the edition component when not adding', () => {
    // Arrange
    const props = {  
      adding: false,    
      onCancel: () => {
        return;
      },
      onSave: (value: ItemValue, id?: ItemId) => {
        return;
      },
      onAdd: () => {
        return;
      },
    };

    // Act
    render(<AddItemComponent {...props} />);
    const addButton = screen.getByLabelText('Añadir');
    const textField = screen.queryByRole('textbox');
    const saveButton = screen.queryByLabelText('Guardar');
    const cancelButton = screen.queryByLabelText('Cancelar');

    // Assert
    expect(addButton).toBeInTheDocument();
    expect(textField).toBeNull();
    expect(saveButton).toBeNull();
    expect(cancelButton).toBeNull();
  });
  it('should enable the add button when not adding', () => {
    // Arrange
    const props = {
      adding: false,
      onCancel: () => {
        return;
      },
      onSave: (value: ItemValue, id?: ItemId) => {
        return;
      },
      onAdd: () => {
        return;
      },
    };

    // Act
    render(<AddItemComponent {...props} />);
    const addButton = screen.getByLabelText('Añadir');

    // Assert
    expect(addButton).not.toBeDisabled();
  });
  it('should disable the add button when adding', () => {
    // Arrange
    const props = {
      adding: true,
      onCancel: () => {
        return;
      },
      onSave: (value: ItemValue, id?: ItemId) => {
        return;
      },
      onAdd: () => {
        return;
      },
      isAdding: true,
    };

    // Act
    render(<AddItemComponent {...props} />);
    const addButton = screen.getByLabelText('Añadir');

    // Assert
    expect(addButton).toBeDisabled();
  });
  it('should call onAdd when clicking the add button', () => {
    // Arrange
    const props = {
      onCancel: () => {
        return;
      },
      onSave: (value: ItemValue, id?: ItemId) => {
        return;
      },
      onAdd: jest.fn(),
      adding: false,
    };

    // Act
    render(<AddItemComponent {...props} />);
    const addButton = screen.getByLabelText('Añadir');
    userEvent.click(addButton);

    // Assert
    expect(props.onAdd).toHaveBeenCalledTimes(1);
  });
  it('should call onSave when clicking the save button', () => {
    // Arrange
    const props = {
      value: '',
      onCancel: () => {
        return;
      },
      onSave: jest.fn(),
      onAdd: () => {
        return;
      },
      adding: true,
    };

    // Act
    render(<AddItemComponent {...props} />);
    const textField = screen.getByRole('textbox');
    const saveButton = screen.getByLabelText('Guardar');
    userEvent.type(textField, 'Test');
    userEvent.click(saveButton);

    // Assert
    expect(props.onSave).toHaveBeenCalledWith('Test', undefined);
  });
  it('should call onCancel when clicking the cancel button', () => {
    // Arrange
    const props = {
      id: '1',
      value: '',
      onCancel: jest.fn(),
      onSave: () => {
        return;
      },
      onAdd: () => {
        return;
      },
      adding: true,
    };

    // Act
    render(<AddItemComponent {...props} />);
    const cancelButton = screen.queryByLabelText('Cancelar');
    userEvent.click(cancelButton);

    // Assert
    expect(props.onCancel).toHaveBeenCalledTimes(1);
  });
});
