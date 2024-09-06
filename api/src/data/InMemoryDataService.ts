import { IData } from './interfaces';

export class InMemoryDataService<T> implements IData<T> {
    private storage: Map<string, T & { _id: string }> = new Map();
  
    async getAll(): Promise<T[]> {
      return Array.from(this.storage.values());
    }
  
    async getById(id: string): Promise<T | null> {
      return this.storage.get(id) || null;
    }
  
    async create(data: T & { _id?: string }): Promise<T & { _id: string }> {
      const id = data._id || this.generateId();
      const newData = { ...data, _id: id };
      this.storage.set(id, newData);
      return newData;
    }
  
    async update(id: string, data: Partial<T>): Promise<void> {
      const existingData = this.storage.get(id);
      if (!existingData) {
        throw new Error(`Item with id ${id} not found`);
      }
      // Ensure _id is not overwritten by spread operation
      const updatedData = { ...existingData, ...data, _id: id };
      this.storage.set(id, updatedData);
    }
  
    async delete(id: string): Promise<void> {
      this.storage.delete(id);
    }
  
    private generateId(): string {
      return Math.random().toString(36).substring(2, 9);
    }
}