## How to Run the API

1. Navigate to the `api` folder:
   ```bash
   cd api
   ```
2. Install the dependencies:
   ```bash
   npm install
   ```
3. Initialize the environment variables:
   ```bash
   npm run init
   ```
4. After initialization, update the `.env` file with the required database connection strings:
   - **MONGO_URI**: MongoDB connection string
   - **POSTGRES_URI**: PostgreSQL connection string

## How to Run the Client

1. Navigate to the `client` folder:
   ```bash
   cd client
   ```
2. Install the client dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. The application will run locally, and the URL will be displayed in the console.

## How the Implementation Works

The application architecture is designed around a generic `IData` interface that defines CRUD (Create, Read, Update, Delete) operations. This interface can be implemented by any data source class, allowing flexibility in switching between different data storage mechanisms.

### Example of a Data Source Implementation

```typescript
export class MongoDBDataService<T> implements IData<T> {
  // Implementation of CRUD operations for MongoDB
}
```

## How to Use

You can create a service that requires a data source, which can be injected into the service class. This makes the service decoupled from the data source, allowing you to swap the data source as needed without changing the service logic.

### Example Usage

1. **Create a Data Source Service**:
   ```typescript
   const dataSourceService = new InMemoryDataService<User>();
   ```

2. **Inject the Data Source into a Service Class**:
   ```typescript
   const userService = new UserService(dataSourceService);
   ```

3. **User Service Example**:
   ```typescript
   export class UserService {
     private dataService: IData<User>;

     constructor(dataSource: IData<User>) {
       this.dataService = dataSource;
     }

     // Additional service methods using dataService for CRUD operations
   }
   ```

In this example, `UserService` accepts any data source that implements the `IData<User>` interface. You can easily swap between different data sources like `MongoDBDataService`, `PostgresDataService`, or `InMemoryDataService` without modifying the `UserService` logic.

