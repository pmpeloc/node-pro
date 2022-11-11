export interface IEntity<T, U> {
  properties: () => T;
  delete: () => void;
  update: (fields: U) => void;
}
