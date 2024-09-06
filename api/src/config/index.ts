interface Config {
  MONGO_URI: string;
  POSTGRESS_URI: string;
}

export const config = {
  MONGO_URI: process.env.MONGO_URI || "mongodb://localhost:27017",
  POSTGRESS_URI: process.env.POSTGRESS_URI || "postgresql://mac1@127.0.0.1:5432/test",
};
