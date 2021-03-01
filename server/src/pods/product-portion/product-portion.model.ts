export interface ProductPortionType {
  id: string;
  name: string;
  portions: Array<ProductPortion>;
}

export interface ProductPortion {
  id: string;
  name: string;
}
