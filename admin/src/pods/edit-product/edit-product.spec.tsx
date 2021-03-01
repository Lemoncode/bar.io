import React from 'react';
import { screen, render, wait, waitFor } from '@testing-library/react';
import { Product } from './product.vm';
import { createEmptyProductVm } from './product.mapper';
import { EditProductComponent } from './edit-product.component';
import userEvent from '@testing-library/user-event';

describe('EditProductComponent tests', () => {
  it('should be in add mode when an empty product model is passed', () => {
    //Arrange
    const props = {
      categories: [
        {
          id: '1',
          name: 'Category I',
        },
        {
          id: '2',
          name: 'Category II',
        },
        {
          id: '3',
          name: 'Category III',
        },
      ],
      product: createEmptyProductVm(),
      portionTypes: [{ id: '1', name: 'Única' }],
      portions: [{ id: '1', name: 'Única' }],
      onSave: (product: Product) => {
        return;
      },
      onChangeCategory: (categoryId: string) => {
        return;
      },
      onChangeName: (name: string) => {
        return;
      },
      onChangeDescription: (description: string) => {
        return;
      },
      onChangePortionPrice: (id: string, price: number) => {
        return;
      },
      onChangePortionType: (id: string) => {
        return;
      },
      onCancel: () => {
        return;
      },
    };

    //Act
    render(<EditProductComponent {...props} />);

    //Assert
    const title = screen.getByRole('heading');
    expect(title).toHaveTextContent('Añadir producto');
    const name = screen.getByText('Nombre');
    expect(name).toBeInTheDocument();
    const description = screen.getByText('Descripción');
    expect(description).toBeInTheDocument();
    const category = screen.getByText('Categoría');
    expect(category).toBeInTheDocument();
    const portionType = screen.getByText('Ración');
    expect(portionType).toBeInTheDocument();
    const buttons = screen.getAllByRole('button');
    expect(buttons.length).toBe(4);
    expect(buttons[2]).toHaveTextContent('Guardar');
    expect(buttons[3]).toHaveTextContent('Cancelar');
  });
  it('should be in edit mode when an existing product is passed', () => {
    //Arrange
    const props = {
      categories: [
        {
          id: '1',
          name: 'Category I',
        },
        {
          id: '2',
          name: 'Category II',
        },
        {
          id: '3',
          name: 'Category III',
        },
      ],
      product: {
        id: '12',
        name: 'Test product',
        description: 'New description',
        visible: true,
        categoryId: '2',
        portionTypeId: '1',
        portions: [
          {
            id: '1',
            name: 'Única',
            price: 10,
          }
        ],
      },
      portionTypes: [{ id: '1', name: 'Única' }],
      portions: [{ id: '1', name: 'Única' }],
      onSave: (product: Product) => {
        return;
      },
      onChangeCategory: (categoryId: string) => {
        return;
      },
      onChangeName: (name: string) => {
        return;
      },
      onChangeDescription: (description: string) => {
        return;
      },
      onChangePortionPrice: (id: string, price: number) => {
        return;
      },
      onChangePortionType: (id: string) => {
        return;
      },
      onCancel: () => {
        return;
      },
    };

    //Act
    render(<EditProductComponent {...props} />);

    //Assert
    const title = screen.getByRole('heading');
    expect(title).toHaveTextContent("Editar 'Test product'");
    const name = screen.getByText('Nombre');
    expect(name).toBeInTheDocument();
    const description = screen.getByText('Descripción');
    expect(description).toBeInTheDocument();
    const fields = screen.getAllByRole('textbox');
    expect(fields[0]).toHaveValue('Test product');
    expect(fields[1]).toHaveValue('New description');
    const category = screen.getByText('Categoría');
    expect(category).toBeInTheDocument();
    const portionType = screen.getByText('Ración');
    expect(portionType).toBeInTheDocument();
    const price = screen.getByText('Precio - Única');
    expect(price).toBeInTheDocument();
    const priceField = screen.getByDisplayValue('10');
    expect(priceField).toBeInTheDocument();
    const buttons = screen.getAllByRole('button');
    expect(buttons.length).toBe(4);
    expect(buttons[0]).toHaveTextContent('Category II');
    expect(buttons[1]).toHaveTextContent('Única');
    expect(buttons[2]).toHaveTextContent('Guardar');
    expect(buttons[3]).toHaveTextContent('Cancelar');
  });
  it('should call onSave when the save button is clicked in', async () => {
    //Arrange
    const props = {
      categories: [
        {
          id: '1',
          name: 'Category I',
        },
        {
          id: '2',
          name: 'Category II',
        },
        {
          id: '3',
          name: 'Category III',
        },
      ],
      product: {
        id: '12',
        name: 'Test product',
        description: 'New description',
        visible: true,
        categoryId: '2',
        portionTypeId: '1',
        portions: [
          {
            id: '1',
            name: 'Portion 1',
            price: 10,
          },
          {
            id: '2',
            name: 'Portion 2',
            price: 15,
          },
        ],
      },
      portionTypes: [{ id: '1', name: 'Única' }],
      portions: [{ id: '1', name: 'Única' }],
      onSave: jest.fn(),
      onChangeCategory: (categoryId: string) => {
        return;
      },
      onChangeName: (name: string) => {
        return;
      },
      onChangeDescription: (description: string) => {
        return;
      },
      onChangePortionPrice: (id: string, price: number) => {
        return;
      },
      onChangePortionType: (id: string) => {
        return;
      },
      onCancel: () => {
        return;
      },
    };

    //Act
    render(<EditProductComponent {...props} />);

    const saveButton = screen.getAllByRole('button')[2];
    userEvent.click(saveButton);

    //Assert
    await waitFor(() => expect(props.onSave).toHaveBeenCalledTimes(1));
  });
  it('should call onCancel when the cancel button is clicked in', () => {
    //Arrange
    const props = {
      categories: [
        {
          id: '1',
          name: 'Category I',
        },
        {
          id: '2',
          name: 'Category II',
        },
        {
          id: '3',
          name: 'Category III',
        },
      ],
      product: {
        id: '12',
        name: 'Test product',
        description: 'New description',
        visible: true,
        categoryId: '2',
        portionTypeId: '1',
        portions: [{ id: '1', name: 'Única', price: 15 }],
      },
      portionTypes: [{ id: '1', name: 'Única' }],
      portions: [{ id: '1', name: 'Única' }],
      onSave: jest.fn(),
      onChangeCategory: (categoryId: string) => {
        return;
      },
      onChangeName: (name: string) => {
        return;
      },
      onChangeDescription: (description: string) => {
        return;
      },
      onChangePortionPrice: (id: string, price: number) => {
        return;
      },
      onChangePortionType: (id: string) => {
        return;
      },
      onCancel: jest.fn(),
    };

    //Act
    render(<EditProductComponent {...props} />);
    const cancelButton = screen.getAllByRole('button')[3];
    userEvent.click(cancelButton);

    //Assert
    expect(props.onCancel).toHaveBeenCalledTimes(1);
  });
});
