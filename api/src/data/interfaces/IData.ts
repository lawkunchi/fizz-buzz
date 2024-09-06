export interface IData<T> {
  getAll(): Promise<T[]>;
  getById(id: string): Promise<T | null>;
  create(data: T): Promise<T>;
  update(id: string, data: Partial<T>): Promise<void>;
  delete(id: string): Promise<void>;
}
