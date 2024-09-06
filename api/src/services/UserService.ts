import { IData } from '../data/interfaces';
import { User } from '../models/User';

export class UserService {
  private dataService: IData<User>;

  constructor(dataSource: IData<User>) {
    this.dataService = dataSource;
  }

  async getUsers(): Promise<User[]> {
    return this.dataService.getAll();
  }

  async getUserById(id: string): Promise<User | null> {
    return this.dataService.getById(id);
  }

  async createUser(user: User): Promise<User> {
    return this.dataService.create(user);
  }

  async updateUser(id: string, data: Partial<User>): Promise<void> {
    await this.dataService.update(id, data);
  }

  async deleteUser(id: string): Promise<void> {
    await this.dataService.delete(id);
  }
}
