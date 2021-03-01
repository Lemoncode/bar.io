export interface MenuCategory {
    id: string;
    name: string;
    products: Array<Product>;
  }
  
  export interface Product {
    id: string;
    name: string;
    visible: boolean;
    description: string;
    portionTypeId: string;
    portions: Array<Portion>;
  }
  
  export interface Portion {
    id: string;
    price: number;
  }
  