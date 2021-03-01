export interface ProductPortionType {
  id: string;
  name: string;
}

export const createEmptyProductPortionType = (): ProductPortionType => ({
  id: '',
  name: '',
});
