import { mapProductPortionsToListItems } from './edit-portions.mapper';
import { ListItem } from 'common/components/sortable-list/list-item.vm';
import { ProductPortion } from 'core/api';

describe('Categories List mapper tests', () => {
  it('should map to the expected item list when passing valid product portions', () => {
    // Arrange
    const productsPortions: Array<ProductPortion> = [
      { id: '1', name: 'Tapa' },
      { id: '2', name: 'Media' },
      { id: '3', name: 'Ración' },
    ];

    const expectedListItems: Array<ListItem<string>> = [
      { id: '1', value: 'Tapa' },
      { id: '2', value: 'Media' },
      { id: '3', value: 'Ración' },
    ];

    // Act
    const result = mapProductPortionsToListItems(productsPortions);

    // Assert
    expect(result).toStrictEqual(expectedListItems);
  });
  it('should map to a an empty list of items when passing an undefined list of menu categories', () => {
    // Arrange
    const productsPortions: Array<ProductPortion> = undefined;

    // Act
    const result = mapProductPortionsToListItems(productsPortions);

    // Assert
    expect(result).toStrictEqual([]);
  });
  it('should map to a an empty list of items when passing an null list of menu categories', () => {
    // Arrange
    const productsPortions: Array<ProductPortion> = null;

    // Act
    const result = mapProductPortionsToListItems(productsPortions);

    // Assert
    expect(result).toStrictEqual([]);
  });
  it('should map to a an empty list of items when passing an empty list of menu categories', () => {
    // Arrange
    const productsPortions: Array<ProductPortion> = [];

    // Act
    const result = mapProductPortionsToListItems(productsPortions);

    // Assert
    expect(result).toStrictEqual([]);
  });
});
