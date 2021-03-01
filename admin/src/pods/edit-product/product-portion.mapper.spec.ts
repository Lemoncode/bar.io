import * as apiModel from 'core/api/product-portions/product-portions.model';
import {
  mapProductPortionApiModelsToViewModels,
  mapProductPortionTypeApiModelsToViewModels,
} from './product-portion.mapper';
import * as viewModel from './product-portion.vm';

describe('ProductPortionType mapper tests', () => {
  it('should map to api models when passing valid view models', () => {
    //Arrange
    const apiModels: Array<apiModel.ProductPortionType> = [
      {
        id: '1',
        name: 'Type I',
        portions: [
          {
            id: '1',
            name: 'Portion I',
          },
          {
            id: '2',
            name: 'Portion II',
          },
        ],
      },
      {
        id: '2',
        name: 'Type II',
        portions: [
          {
            id: '1',
            name: 'Portion I',
          },
          {
            id: '2',
            name: 'Portion II',
          },
        ],
      },
    ];

    //Act
    const viewModels = mapProductPortionTypeApiModelsToViewModels(apiModels);

    //Assert
    const expectedViewModels: Array<viewModel.ProductPortionType> = [
      {
        id: '1',
        name: 'Type I',
      },
      {
        id: '2',
        name: 'Type II',
      },
    ];

    expect(viewModels).toStrictEqual(expectedViewModels);
  });
});

describe('ProductPortion mapper tests', () => {
  it('should map to api models when passing valid view models', () => {
    //Arrange
    const apiModels: Array<apiModel.ProductPortion> = [
      {
        id: '1',
        name: 'Type I',
      },
      {
        id: '2',
        name: 'Type II',
      },
    ];

    //Act
    const viewModels = mapProductPortionApiModelsToViewModels(apiModels);

    //Assert
    const expectedViewModels: Array<viewModel.ProductPortion> = [
      {
        id: '1',
        name: 'Type I',
        price: 0,
      },
      {
        id: '2',
        name: 'Type II',
        price: 0,
      },
    ];

    expect(viewModels).toStrictEqual(expectedViewModels);
  });
});
