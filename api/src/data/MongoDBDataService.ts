import { IData } from './interfaces';
import { MongoClient, ObjectId, Db, Collection } from 'mongodb';

interface WithId<T> {
  _id: ObjectId;
}

export class MongoDBDataService<T> implements IData<T> {
  private client: MongoClient;
  private db!: Db;
  private collection!: Collection<WithId<T>>;

  constructor(mongoUrl: string, dbName: string, collectionName: string) {
    this.client = new MongoClient(mongoUrl);
    this.db = this.client.db(dbName);
    this.client.connect();
    this.collection = this.db.collection<WithId<T>>(collectionName);
  }

  async getAll(): Promise<T[]> {
    return this.collection.find({}).toArray() as Promise<T[]>;
  }

  async getById(id: string): Promise<T | null> {
    return this.collection.findOne({ _id: new ObjectId(id) }) as Promise<T | null>;
  }

  async create(data: T): Promise<T & { _id: ObjectId }> {
    const result = await this.collection.insertOne(data as any);
    return { ...data, _id: result.insertedId };
  }

  async update(id: string, data: Partial<T>): Promise<void> {
    await this.collection.updateOne({ _id: new ObjectId(id) }, { $set: data as any });
  }

  async delete(id: string): Promise<void> {
    await this.collection.deleteOne({ _id: new ObjectId(id) });
  }
}