import { ListItem } from 'common/components';
import { ProductPortionType } from 'core/api';
import { mapProductPortionTypeApiModelsToListItems, mapProductPortionTypeApiModelToListItem } from './product-portion-types.mapper';

describe('ProductPortionType mapper tests', () => {
  it('should return empty ProductPortionType when it feeds undefined', () => {
    // Arrange
    const productPortionType: ProductPortionType = undefined;

    // Act
    const result: ListItem<string> = mapProductPortionTypeApiModelToListItem(productPortionType);

    // Assert
    expect(result).toEqual({
      id: null,
      value: null,
    });
  });

  it('should return empty ProductPortionType when it feeds null', () => {
    // Arrange
    const productPortionType: ProductPortionType = null;

    // Act
    const result: ListItem<string> = mapProductPortionTypeApiModelToListItem(productPortionType);

    // Assert
    expect(result).toEqual({
      id: null,
      value: null,
    });
  });

  it('should return empty ProductPortionType when it feeds empty object', () => {
    // Arrange
    const productPortionType: ProductPortionType = {
      id: '',
      name: '',
    };

    // Act
    const result: ListItem<string> = mapProductPortionTypeApiModelToListItem(productPortionType);

    // Assert
    expect(result).toEqual({
      id: '',
      value: '',
    });
  });

  it('should return mapped ProductPortionType when it feed ListItem with data', () => {
    // Arrange
    const productPortionType: ProductPortionType = {
      id: '1',
      name: 'Product Portion Type test name',
    };

    // Act
    const result: ListItem<string> = mapProductPortionTypeApiModelToListItem(productPortionType);

    // Assert
    expect(result).toEqual({
      id: '1',
      value: 'Product Portion Type test name',
    });
  });

  it('should return empty array when feeding undefined ProductPortionType list', () => {
    // Arrange
    const productPortionTypes = undefined;

    // Act
    const result = mapProductPortionTypeApiModelsToListItems(productPortionTypes);

    // Assert
    expect(result).toEqual([]);
  });

  it('should return empty array when feeding null ProductPortionType list', () => {
    // Arrange
    const productPortionTypes = null;

    // Act
    const result = mapProductPortionTypeApiModelsToListItems(productPortionTypes);

    // Assert
    expect(result).toEqual([]);
  });

  it('should return empty array when feeding empty array ProductPortionType list', () => {
    // Arrange
    const productPortionTypes: ProductPortionType[] = [];

    // Act
    const result = mapProductPortionTypeApiModelsToListItems(productPortionTypes);

    // Assert
    expect(result).toEqual([]);
  });

  it('should return one item with values when passing one item with values', () => {
    // Arrange
    const productPortionTypes: ProductPortionType[] = [
      {
        id: '1',
        name: 'test name',
      },
    ];

    const expectedResult: ListItem<string>[] = [
      {
        id: '1',
        value: 'test name',
      },
    ];

    // Act
    const result = mapProductPortionTypeApiModelsToListItems(productPortionTypes);

    // Assert
    expect(result).toEqual(expectedResult);
  });

  it('should return two item with values when passing two item with values', () => {
    // Arrange
    const productPortionTypes: ProductPortionType[] = [
      {
        id: '1',
        name: 'test name 1',
      },
      {
        id: '2',
        name: 'test name 2',
      },
    ];

    const expectedResult: ListItem<string>[] = [
      {
        id: '1',
        value: 'test name 1',
      },
      {
        id: '2',
        value: 'test name 2',
      },
    ];

    // Act
    const result = mapProductPortionTypeApiModelsToListItems(productPortionTypes);

    // Assert
    expect(result).toEqual(expectedResult);
  });
});
