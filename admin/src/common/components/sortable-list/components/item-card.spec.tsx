import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ItemCardComponent } from './item-card.component';

describe('ItemCardComponent tests', () => {
  it('should show the item value and the edit and delete buttons when not editing', () => {
    // Arrange
    const props = {
      id: '1',
      value: 'Test Value',
      edit: false,
      onEdit: (id: string) => {
        return;
      },
      onDelete: (id: string) => {
        return;
      },
      onSave: (value: string, id?: string) => {
        return;
      },
      onCancel: () => {
        return;
      },
    };

    // Act
    render(<ItemCardComponent {...props} />);
    const itemValue = screen.getByText(props.value);
    const editButton = screen.getByLabelText(`Editar ${props.value}`);
    const deleteButton = screen.getByLabelText(`Borrar ${props.value}`);
    const saveButton = screen.queryByLabelText('Guardar');
    const cancelButton = screen.queryByLabelText('Cancelar');

    // Assert
    expect(itemValue).toBeInTheDocument();
    expect(editButton).toBeInTheDocument();
    expect(deleteButton).toBeInTheDocument();
    expect(saveButton).toBeNull();
    expect(cancelButton).toBeNull();
  });
  it('should show the item value and the save and cancel buttons when editing', () => {
    // Arrange
    const props = {
      id: '1',
      value: 'Test Value',
      edit: true,
      onEdit: (id: string) => {
        return;
      },
      onDelete: (id: string) => {
        return;
      },
      onSave: (value: string, id?: string) => {
        return;
      },
      onCancel: () => {
        return;
      },
    };

    // Act
    render(<ItemCardComponent {...props} />);
    const itemValue = screen.getByRole('textbox');
    const editButton = screen.queryByLabelText(`Editar ${props.value}`);
    const deleteButton = screen.queryByLabelText(`Borrar ${props.value}`);
    const saveButton = screen.getByLabelText('Guardar');
    const cancelButton = screen.getByLabelText('Cancelar');

    // Assert
    expect(itemValue).toBeInTheDocument();
    expect(editButton).toBeNull();
    expect(deleteButton).toBeNull();
    expect(saveButton).toBeInTheDocument();
    expect(cancelButton).toBeInTheDocument();
  });
  it('should call onEdit when clicking on the edit button', () => {
    // Arrange
    const props = {
      id: '1',
      value: 'Test Value',
      edit: false,
      onEdit: jest.fn(),
      onDelete: (id: string) => {
        return;
      },
      onSave: (value: string, id?: string) => {
        return;
      },
      onCancel: () => {
        return;
      },
    };

    // Act
    render(<ItemCardComponent {...props} />);
    const editButton = screen.getByLabelText(`Editar ${props.value}`);
    userEvent.click(editButton);

    // Assert
    expect(props.onEdit).toHaveBeenCalledWith('1');
  });
  it('should call onDelete when clicking on the delete button', () => {
    // Arrange
    const props = {
      id: '1',
      value: 'Test Value',
      edit: false,
      onEdit: () => {
        return;
      },
      onDelete: jest.fn(),
      onSave: (value: string, id?: string) => {
        return;
      },
      onCancel: () => {
        return;
      },
    };

    // Act
    render(<ItemCardComponent {...props} />);
    const deleteButton = screen.getByLabelText(`Borrar ${props.value}`);
    userEvent.click(deleteButton);

    // Assert
    expect(props.onDelete).toHaveBeenCalledWith('1');
  });
  it('should call onSave when clicking on the save button', () => {
    // Arrange
    const props = {
      id: '1',
      value: '',
      edit: true,
      onEdit: () => {
        return;
      },
      onDelete: (id: string) => {
        return;
      },
      onSave: jest.fn(),
      onCancel: () => {
        return;
      },
    };

    // Act
    render(<ItemCardComponent {...props} />);
    const itemValue = screen.getByRole('textbox');
    const saveButton = screen.getByLabelText('Guardar');
    userEvent.type(itemValue, 'Test');
    userEvent.click(saveButton);

    // Assert
    expect(props.onSave).toHaveBeenCalledWith('Test', '1');
  });
  it('should call onCancel when clicking on the cancel button', () => {
    // Arrange
    const props = {
      id: '1',
      value: 'Test Value',
      edit: true,
      onEdit: () => {
        return;
      },
      onDelete: (id: string) => {
        return;
      },
      onSave: (value: string, id?: string) => {
        return;
      },
      onCancel: jest.fn(),
    };

    // Act
    render(<ItemCardComponent {...props} />);
    const cancelButton = screen.getByLabelText('Cancelar');
    userEvent.click(cancelButton);

    // Assert
    expect(props.onCancel).toHaveBeenCalledTimes(1);
  });
  it('should call onChangeVisibility when clicking on the visibility button', () => {
    // Arrange
    const props = {
      id: '1',
      value: 'Test Value',
      edit: false,
      visible: true,
      onEdit: () => {
        return;
      },
      onDelete: (id: string) => {
        return;
      },
      onSave: (value: string, id?: string) => {
        return;
      },
      onCancel: () => {
        return;
      },
      onChangeVisibility: jest.fn(),
    };

    // Act
    render(<ItemCardComponent {...props} />);
    const changeVisibilityButton = screen.getByLabelText(`Hacer invisible ${props.value}`);
    userEvent.click(changeVisibilityButton);

    // Assert
    expect(props.onChangeVisibility).toHaveBeenCalledWith('1');
  });
});
