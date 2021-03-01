export interface Product {
  id: string;
  name: string;
  description: string;
  visible: boolean;
  portionTypeId: string;
  portions: Array<Portion>;
}

export interface Portion {
  id: string;  
  price: number;
}
