import { act, renderHook } from '@testing-library/react-hooks';
import { MenuCategory, Product } from 'core/api';
import { useMenuCategories } from './use-menu-categories.hook';

describe('useMenuCategories hook tests', () => {
  it('should return the categories and the selected category id and functions to update them when it is called', () => {
    // Arrange
    const categories: Array<MenuCategory> = [
      {
        id: '1',
        name: 'Cat 1',
        products: [
          {
            id: '1',
            name: ' Prod 1.1',
            description: 'New Description 1',
            portionTypeId:  '',
            portions: [],
            visible: false,
          },
          {
            id: '2',
            name: ' Prod 1.2',
            description: 'New Description 2',
            portionTypeId:  '',
            portions: [],
            visible: true,
          },
        ],
      },
      {
        id: '2',
        name: 'Cat 2',
        products: [
          {
            id: '3',
            name: ' Prod 2.1',
            description: 'New Description 3',
            portionTypeId:  '',
            portions: [],
            visible: false,
          },
          {
            id: '4',
            name: ' Prod 2.2',
            description: 'New Description 4',
            portionTypeId:  '',
            portions: [],
            visible: true,
          },
        ],
      },
      {
        id: '3',
        name: 'Cat 3',
        products: [],
      },
    ];

    // Act
    const { result } = renderHook(() => useMenuCategories(categories, '2'));

    // Assert
    expect(result.current.categories).toStrictEqual(categories);
    expect(result.current.selectedCategoryId).toBe('2');
    expect(result.current.setSelectedCategoryId).toEqual(expect.any(Function));
    expect(result.current.setCategories).toEqual(expect.any(Function));
    expect(result.current.getProductsByCategoryId).toEqual(expect.any(Function));
    expect(result.current.updateSelectedCategoryProducts).toEqual(expect.any(Function));
  });
  it('should update the categories when it calls setCategories', () => {
    // Arrange
    const categories: Array<MenuCategory> = [
      {
        id: '1',
        name: 'Cat 1',
        products: [
          {
            id: '1',
            name: ' Prod 1.1',
            description: 'New Description 1',
            portionTypeId:  '',
            portions: [],
            visible: false,
          },
          {
            id: '2',
            name: ' Prod 1.2',
            description: 'New Description 2',
            portionTypeId:  '',
            portions: [],
            visible: true,
          },
        ],
      },
      {
        id: '2',
        name: 'Cat 2',
        products: [
          {
            id: '3',
            name: ' Prod 2.1',
            description: 'New Description 3',
            portionTypeId:  '',
            portions: [],
            visible: false,
          },
          {
            id: '4',
            name: ' Prod 2.2',
            description: 'New Description 4',
            portionTypeId:  '',
            portions: [],
            visible: true,
          },
        ],
      },
      {
        id: '3',
        name: 'Cat 3',
        products: [],
      },
    ];

    // Act
    const { result } = renderHook(() => useMenuCategories([], null));
    act(() => {
      result.current.setCategories(categories);
    });

    // Assert
    expect(result.current.categories).toStrictEqual(categories);
  });
  it('should update the selectedCategory when calling setSelectedCategoryId', () => {
    // Arrange
    const categories: Array<MenuCategory> = [
      {
        id: '1',
        name: 'Cat 1',
        products: [
          {
            id: '1',
            name: ' Prod 1.1',
            description: 'New Description 1',
            portionTypeId:  '',
            portions: [],
            visible: false,
          },
          {
            id: '2',
            name: ' Prod 1.2',
            description: 'New Description 2',
            portionTypeId:  '',
            portions: [],
            visible: true,
          },
        ],
      },
      {
        id: '2',
        name: 'Cat 2',
        products: [
          {
            id: '3',
            name: ' Prod 2.1',
            description: 'New Description 3',
            portionTypeId:  '',
            portions: [],
            visible: false,
          },
          {
            id: '4',
            name: ' Prod 2.2',
            description: 'New Description 4',
            portionTypeId:  '',
            portions: [],
            visible: true,
          },
        ],
      },
      {
        id: '3',
        name: 'Cat 3',
        products: [],
      },
    ];

    // Act
    const { result } = renderHook(() => useMenuCategories(categories, '1'));
    act(() => {
      result.current.setSelectedCategoryId('2');
    });

    // Assert
    expect(result.current.selectedCategoryId).toStrictEqual('2');
  });
  it('should update the selected category products when calling updateSelectedCategoryProducts', () => {
    // Arrange
    const categories: Array<MenuCategory> = [
      {
        id: '1',
        name: 'Cat 1',
        products: [
          {
            id: '1',
            name: ' Prod 1.1',
            description: 'New Description 1',
            portionTypeId:  '',
            portions: [],
            visible: false,
          },
          {
            id: '2',
            name: ' Prod 1.2',
            description: 'New Description 2',
            portionTypeId:  '',
            portions: [],
            visible: true,
          },
        ],
      },
      {
        id: '2',
        name: 'Cat 2',
        products: [
          {
            id: '3',
            name: ' Prod 2.1',
            description: 'New Description 3',
            portionTypeId:  '',
            portions: [],
            visible: false,
          },
          {
            id: '4',
            name: ' Prod 2.2',
            description: 'New Description 4',
            portionTypeId:  '',
            portions: [],
            visible: true,
          },
        ],
      },
      {
        id: '3',
        name: 'Cat 3',
        products: [],
      },
    ];

    const products: Array<Product> = [
      {
        id: '3',
        name: ' Prod 2.1',
        description: 'New description 3',
        portionTypeId:  '',
        portions: [],
        visible: false,
      },
      {
        id: '4',
        name: ' Prod 2.2',

        description: 'New description 4',
        portionTypeId:  '',
        portions: [],
        visible: true,
      },
      {
        id: '5',
        name: ' Prod 2.3',
        description: 'New description 5',
        portionTypeId:  '',
        portions: [],
        visible: false,
      },
    ];

    // Act
    const { result } = renderHook(() => useMenuCategories(categories, '1'));
    act(() => {
      result.current.updateSelectedCategoryProducts(products);
    });

    // Assert
    expect(result.current.categories.filter((c) => c.id === '1')[0].products).toStrictEqual(products);
  });
  it('should return the expected category products when calling getProductsByCategoryId with a valid category id', () => {
    // Arrange
    const categories: Array<MenuCategory> = [
      {
        id: '1',
        name: 'Cat 1',
        products: [
          {
            id: '1',
            name: ' Prod 1.1',
            description: 'New Description 1',
            portionTypeId:  '',
            portions: [],
            visible: false,
          },
          {
            id: '2',
            name: ' Prod 1.2',
            description: 'New Description 2',
            portionTypeId:  '',
            portions: [],
            visible: true,
          },
        ],
      },
      {
        id: '2',
        name: 'Cat 2',
        products: [
          {
            id: '3',
            name: ' Prod 2.1',
            description: 'New Description 3',
            portionTypeId:  '',
            portions: [],
            visible: false,
          },
          {
            id: '4',
            name: ' Prod 2.2',
            description: 'New Description 4',
            portionTypeId:  '',
            portions: [],
            visible: true,
          },
        ],
      },
      {
        id: '3',
        name: 'Cat 3',
        products: [],
      },
    ];

    // Act
    const { result } = renderHook(() => useMenuCategories(categories, '1'));

    // Assert
    expect(result.current.getProductsByCategoryId('2')).toStrictEqual(
      categories.filter((c) => c.id === '2')[0].products,
    );
  });

  it('should return an empty array when calling getProductsByCategoryId with an invalid category id', () => {
    // Arrange
    const categories: Array<MenuCategory> = [
      {
        id: '1',
        name: 'Cat 1',
        products: [
          {
            id: '1',
            name: ' Prod 1.1',
            description: 'New Description 1',
            portionTypeId:  '',
            portions: [],
            visible: false,
          },
          {
            id: '2',
            name: ' Prod 1.2',
            description: 'New Description 2',
            portionTypeId:  '',
            portions: [],
            visible: true,
          },
        ],
      },
      {
        id: '2',
        name: 'Cat 2',
        products: [
          {
            id: '3',
            name: ' Prod 2.1',
            description: 'New Description 3',
            portionTypeId:  '',
            portions: [],
            visible: false,
          },
          {
            id: '4',
            name: ' Prod 2.2',
            description: 'New Description 4',
            portionTypeId:  '',
            portions: [],
            visible: true,
          },
        ],
      },
      {
        id: '3',
        name: 'Cat 3',
        products: [],
      },
    ];

    // Act
    const { result } = renderHook(() => useMenuCategories(categories, '1'));

    // Assert
    expect(result.current.getProductsByCategoryId('7')).toStrictEqual([]);
  });
});
