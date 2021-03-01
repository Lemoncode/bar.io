import React from 'react';
import { screen, render } from '@testing-library/react';
import { ProductListComponent } from './product-list.component';

describe('ProductListComponent tests', () => {
  it('should show only the category dropdown when nothing is selected', () => {
    //Arrange
    const props = {
      selectedCategoryId: null,
      categories: [
        {
          id: '1',
          value: 'Cat 1',
        },
        {
          id: '2',
          value: 'Cat 2',
        },
        {
          id: '3',
          value: 'Cat 3',
        },
      ],
      products: [
        {
          id: '3',
          value: 'Prod 2.1',
          visible: false,
        },
        {
          id: '4',
          value: 'Prod 2.2',
          visible: true,
        },
      ],
      onChangeCategory: (id: string) => {
        return;
      },
      onEditProduct: (id: string) => {
        return;
      },
      onDeleteProduct: (id: string) => {
        return;
      },
      onChangeProductVisibility: (id: string) => {
        return;
      },
      onReorderProducts: (startIndex: number, endIndex: number) => {
        return;
      },
      onAddProduct: () => {
        return;
      },
      onCancelProductEdit: () => {
        return;
      },
    };

    //Act
    render(<ProductListComponent {...props} />);
    const select = screen.getByLabelText('Seleccione una categoría');
    const buttons = screen.getAllByRole('button');

    //Assert
    expect(select).toBeInTheDocument();
    expect(buttons.length).toBe(1);
  });
  it('should show the selected category, the add product button and a message saying there are not items \
      when selected a category without products', () => {
    //Arrange
    const props = {
      selectedCategoryId: '2',
      categories: [
        {
          id: '1',
          value: 'Cat 1',
        },
        {
          id: '2',
          value: 'Cat 2',
        },
        {
          id: '3',
          value: 'Cat 3',
        },
      ],
      products: [],
      onChangeCategory: (id: string) => {
        return;
      },
      onEditProduct: (id: string) => {
        return;
      },
      onDeleteProduct: (id: string) => {
        return;
      },
      onChangeProductVisibility: (id: string) => {
        return;
      },
      onReorderProducts: (startIndex: number, endIndex: number) => {
        return;
      },
      onAddProduct: () => {
        return;
      },
      onCancelProductEdit: () => {
        return;
      },
    };

    //Act
    render(<ProductListComponent {...props} />);
    const selectedCategory = screen.getByText(props.categories[1].value);
    const addButton = screen.getByRole('button', { name: 'Añadir' });
    const disclaimer = screen.getByText('No existen productos');

    //Assert
    expect(selectedCategory).toBeInTheDocument();
    expect(addButton).toBeInTheDocument();
    expect(disclaimer).toBeInTheDocument();
  });
  it('should show the selected category, the add product button and a list of products \
      when selected a category with products', () => {
    //Arrange
    const props = {
      selectedCategoryId: '2',
      categories: [
        {
          id: '1',
          value: 'Cat 1',
        },
        {
          id: '2',
          value: 'Cat 2',
        },
        {
          id: '3',
          value: 'Cat 3',
        },
      ],
      products: [
        {
          id: '3',
          value: 'Prod 2.1',
          visible: false,
        },
        {
          id: '4',
          value: 'Prod 2.2',
          visible: true,
        },
      ],
      onChangeCategory: (id: string) => {
        return;
      },
      onEditProduct: (id: string) => {
        return;
      },
      onDeleteProduct: (id: string) => {
        return;
      },
      onChangeProductVisibility: (id: string) => {
        return;
      },
      onReorderProducts: (startIndex: number, endIndex: number) => {
        return;
      },
      onAddProduct: () => {
        return;
      },
      onCancelProductEdit: () => {
        return;
      },
    };

    //Act
    render(<ProductListComponent {...props} />);
    const selectedCategory = screen.getByText(props.categories[1].value);
    const addButton = screen.getByRole('button', { name: 'Añadir' });
    const productItems = props.products.map((p) => screen.getByText(p.value));

    //Assert
    expect(selectedCategory).toBeInTheDocument();
    expect(addButton).toBeInTheDocument();
    expect(productItems.length).toBe(props.products.length);
  });
});
