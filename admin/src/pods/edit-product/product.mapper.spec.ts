import { Product as ApiModel } from 'core/api/menu-categories/product.model';
import { mapProductApiModelToViewModel, mapProductViewModelToApiModel } from './product.mapper';
import { Product as ViewModel } from './product.vm';

describe('Product mapper tests', () => {
  it('should map to a view model when passing a valid api model', () => {
    //Arrange
    const apiModel: ApiModel = {
      id: '1',
      name: 'Test model',
      description: 'New description',
      portionTypeId: '10',
      portions: [
        {
          id: '1',
          price: 15,
        },
      ],
      visible: true,
    };

    //Act
    const result = mapProductApiModelToViewModel(apiModel);

    //Assert
    const expectedResult: ViewModel = {
      id: '1',
      name: 'Test model',
      description: 'New description',
      portionTypeId: '10',
      categoryId: null,
      portions: [{
        id: '1',
        name: '',
        price: 15
      }],
      visible: true,
    };

    expect(result).toStrictEqual(expectedResult);
  });
  it('should map to a view model when passing an api model with empty portions', () => {
    //Arrange
    const apiModel: ApiModel = {
      id: '1',
      name: 'Test model',
      description: 'New description',
      portionTypeId: '10',
      portions: [],
      visible: true,
    };

    //Act
    const result = mapProductApiModelToViewModel(apiModel);

    //Assert
    const expectedResult: ViewModel = {
      id: '1',
      name: 'Test model',
      description: 'New description',
      portionTypeId: '10',
      categoryId: null,
      portions: [],
      visible: true,
    };

    expect(result).toStrictEqual(expectedResult);
  });
  it('should map to a view model when passing an api model with null portions', () => {
    //Arrange
    const apiModel: ApiModel = {
      id: '1',
      name: 'Test model',
      description: 'New description',
      portionTypeId: '10',
      portions: null,
      visible: true,
    };

    //Act
    const result = mapProductApiModelToViewModel(apiModel);

    //Assert
    const expectedResult: ViewModel = {
      id: '1',
      name: 'Test model',
      description: 'New description',
      portionTypeId: '10',
      categoryId: null,
      portions: [],
      visible: true,
    };

    expect(result).toStrictEqual(expectedResult);
  });
  it('should map to a view model when passing an api model with undefined portions', () => {
    //Arrange
    const apiModel: ApiModel = {
      id: '1',
      name: 'Test model',
      description: 'New description',
      portionTypeId: '10',
      portions: undefined,
      visible: true,
    };

    //Act
    const result = mapProductApiModelToViewModel(apiModel);

    //Assert
    const expectedResult: ViewModel = {
      id: '1',
      name: 'Test model',
      description: 'New description',
      portionTypeId: '10',
      categoryId: null,
      portions: [],
      visible: true,
    };

    expect(result).toStrictEqual(expectedResult);
  });
  it('should map to an api model when passing a valid view model', () => {
    //Arrange
    const viewModel: ViewModel = {
      id: '1',
      name: 'Test model',
      description: 'New description',
      portionTypeId: '10',
      categoryId: null,
      portions: [{
        id: '1',
        name: 'Única',
        price: 15
      }],
      visible: true,
    };

    //Act
    const result = mapProductViewModelToApiModel(viewModel);

    //Assert
    const expectedResult: ApiModel = {
      id: '1',
      name: 'Test model',
      description: 'New description',
      portionTypeId: '10',
      portions: [{ id: '1', price: 15 }],
      visible: true,
    };

    expect(result).toStrictEqual(expectedResult);
  });
  it('should map to an api model when passing a view model with empty portionPrices', () => {
    //Arrange
    const viewModel: ViewModel = {
      id: '1',
      name: 'Test model',
      description: 'New description',
      portionTypeId: '10',
      categoryId: null,
      portions: [],
      visible: true,
    };

    //Act
    const result = mapProductViewModelToApiModel(viewModel);

    //Assert
    const expectedResult: ApiModel = {
      id: '1',
      name: 'Test model',
      description: 'New description',
      portionTypeId: '10',
      portions: [],
      visible: true,
    };

    expect(result).toStrictEqual(expectedResult);
  });
});
