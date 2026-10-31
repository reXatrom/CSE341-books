
import { MongoClient } from 'mongodb';
import dns from 'node:dns';

let database;

// Use Google DNS to resolve MongoDB Atlas SRV records
dns.setServers(['8.8.8.8', '8.8.4.4']);

const connectToDb = async () => {
  const connectionString = process.env.MONGODB_URI;

  if (!connectionString) {
    throw new Error('MONGODB_URI is required.');
  }

  const client = new MongoClient(connectionString);
  await client.connect();

  database = client.db(
    process.env.MONGODB_DB_NAME || 'cse341-books-db'
  );

  return database;
};

const getDb = () => {
  if (!database) {
    throw new Error('Database not initialized. Call connectToDb first.');
  }

  return database;
};

export { connectToDb, getDb };
