import React from 'react';
import { render, screen } from '@testing-library/react';
import { MenuListComponent } from '.';
import { formatToEuros } from 'common';

describe('MenuListComponentTest', () => {
  it('should show the menu categories and their products when passed a valid menu', () => {
    // Arrange
    const props = {
      categories: [
        {
          name: 'Entrantes',
          products: [
            {
              id: '1',
              name: 'Chorizo criollo',
              description: 'Muy picante',
              portions: [{ name: 'Única', price: '5,00 €' }],
            },
            {
              id: '2',
              name: 'Queso provolone',
              description: '',
              portions: [{ name: 'Única', price: '5,00 €' }],
            },
            {
              id: '3',
              name: 'Jamón ibérico',
              description: '',
              portions: [{ name: 'Única', price: '5,00 €' }],
            },
          ],
        },
        {
          name: 'Platos Principales',
          products: [
            {
              id: '12',
              name: 'Flamenquín cordobés',
              description: 'Casero con queso',
              portions: [{ name: 'Única', price: '5,00 €' }],
            },
            {
              id: '13',
              name: 'Carrillada ibérica al Predro Ximénez',
              description: '',
              portions: [{ name: 'Única', price: '5,00 €' }],
            },
            {
              id: '14',
              name: 'Huevos rotos con chorizo y patatas fritas',
              description: '',
              portions: [{ name: 'Única', price: '5,00 €' }],
            },
          ],
        },
        {
          name: 'Postres',
          products: [
            {
              id: '21',
              name: 'Torrijas',
              description: '',
              portions: [{ name: 'Única', price: '5,00 €' }],
            },
            {
              id: '22',
              name: 'Coulant de chocolate negro con helado de vainilla',
              description: '',
              portions: [{ name: 'Única', price: '5,00 €' }],
            },
          ],
        },
        {
          name: 'Bebidas',
          products: [
            {
              id: '24',
              name: 'Refrescos',
              description: '',
              portions: [{ name: 'Única', price: '5,00 €' }],
            },
            {
              id: '25',
              name: 'Cerveza (caña)',
              description: '',
              portions: [{ name: 'Única', price: '5,00 €' }],
            },
            {
              id: '26',
              name: 'Cerveza (Jarra)',
              description: '',
              portions: [{ name: 'Única', price: '5,00 €' }],
            },
          ],
        },
      ],
    };

    // Act
    render(<MenuListComponent {...props} />);
    const categories = props.categories.map((c) => c.name).map((name) => screen.getByText(name));
    const products = new Array<string>();
    props.categories.map((c) => c.products.map((d) => products.push(`${d.name}`)));
    const productItems = products.map((d) => screen.getByText(d));

    // Assert
    expect(categories.length).toBe(props.categories.length);
    expect(productItems.length).toBe(products.length);
  });

  it('should not show anything when passing and empty list', () => {
    // Arrange
    const props = {
      categories: [],
    };

    // Act
    const { container } = render(<MenuListComponent {...props} />);
    // Assert

    expect(container.innerHTML).toBe('<div></div>');
  });

  it('should not show anything when passing a null list', () => {
    // Arrange
    const props = {
      categories: null,
    };

    // Act
    const { container } = render(<MenuListComponent {...props} />);
    // Assert

    expect(container.innerHTML).toBe('<div></div>');
  });

  it('should not show anything when passing an undefined list', () => {
    // Arrange
    const props = {
      categories: undefined,
    };

    // Act
    const { container } = render(<MenuListComponent {...props} />);
    // Assert

    expect(container.innerHTML).toBe('<div></div>');
  });
});
