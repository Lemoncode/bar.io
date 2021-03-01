export interface ProductPortionType {
  _id: string;
  name: string;
  portions: Array<ProductPortion>;
}

export interface ProductPortion {
  _id: string;
  name: string;
}
