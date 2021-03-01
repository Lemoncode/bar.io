import { ProductPortion, ProductPortionType } from 'dals';

export interface ProductPortionTypeRepositoryContract {
  getProductPortionTypes: () => Promise<Array<ProductPortionType>>;
  getProductPortionTypeById: (id: string) => Promise<ProductPortionType>;
  saveProductPortionType: (
    type: ProductPortionType
  ) => Promise<void>;
  saveProductPortionTypes: (portionTypes: Array<ProductPortionType>) => Promise<void>;
  saveProductPortion: (portion: ProductPortion, typeId?: string) => Promise<void>;
  deleteProductPortionType: (id: string) => Promise<void>;
  deleteProductPortion: (id: string) => Promise<void>;
}
