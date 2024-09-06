import { User } from '../models/User';
import { IData } from './interfaces';
import { Pool } from 'pg';

export class PostgresDataService<T extends User>  implements IData<T> {
  private pool: Pool;
  private tableName: string;

  constructor(connectionString: string, tableName: string) {
    this.pool = new Pool({ connectionString });
    this.tableName = tableName;
  }

  async getAll(): Promise<T[]> {
    try {
      const result = await this.pool.query<T>(`SELECT * FROM ${this.tableName}`);
      return result.rows;
    } catch (error) {
      console.error('Error fetching all records:', error);
      throw new Error('Error fetching all records');
    }
  }

  async getById(id: string): Promise<T | null> {
    try {
      const result = await this.pool.query<T>(`SELECT * FROM ${this.tableName} WHERE _id = $1`, [id]);
      return result.rows[0] || null;
    } catch (error) {
      console.error(`Error fetching record with _id ${id}:`, error);
      throw new Error(`Error fetching record with _id ${id}`);
    }
  }

  async create(data: T): Promise<T> {
    const keys = Object.keys(data).join(', ');
    const values = Object.values(data);
    const placeholders = values.map((_, i) => `$${i + 1}`).join(', ');

    try {
      const result = await this.pool.query<T>(
        `INSERT INTO ${this.tableName} (${keys}) VALUES (${placeholders}) RETURNING *`,
        values
      );
      return result.rows[0];
    } catch (error) {
      console.error('Error creating record:', error);
      throw new Error('Error creating record');
    }
  }

  async update(id: string, data: Partial<T>): Promise<void> {
    const keys = Object.keys(data);
    const values = Object.values(data);
    const setClause = keys.map((key, i) => `${key} = $${i + 2}`).join(', ');

    try {
      await this.pool.query(
        `UPDATE ${this.tableName} SET ${setClause} WHERE id = $1`,
        [id, ...values]
      );
    } catch (error) {
      console.error(`Error updating record with id ${id}:`, error);
      throw new Error(`Error updating record with id ${id}`);
    }
  }

  async delete(id: string): Promise<void> {
    try {
      await this.pool.query(`DELETE FROM ${this.tableName} WHERE _id = $1`, [id]);
    } catch (error) {
      console.error(`Error deleting record with id ${id}:`, error);
      throw new Error(`Error deleting record with id ${id}`);
    }
  }
}