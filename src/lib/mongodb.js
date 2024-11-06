import { MongoClient } from 'mongodb';
import logger from './logger';

const uri = process.env.MONGODB_URI;
let client;
let clientPromise;

if (!uri) {
  logger.error('Please add your Mongo URI to .env.local or .env.development');
  throw new Error('Please add your Mongo URI to .env.local or .env.development');
}

if (process.env.NODE_ENV === 'development') {
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  client = new MongoClient(uri);
  clientPromise = client.connect();
}

export default clientPromise;
