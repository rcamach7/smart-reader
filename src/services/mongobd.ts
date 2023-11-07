import { MongoClient } from 'mongodb';
import mongoose from 'mongoose';

function mongodbConnectionPromise() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error('Please add your Mongo URI to .env.local');
  }

  function createClient() {
    const client = new MongoClient(uri);
    return client.connect().catch((err) => {
      console.error('Error connecting to MongoDB:', err);
      throw err;
    });
  }

  let clientPromise;
  if (process.env.NODE_ENV === 'development') {
    if (!global._mongoClientPromise) {
      global._mongoClientPromise = createClient();
    }
    clientPromise = global._mongoClientPromise;
  } else {
    clientPromise = createClient();
  }

  return clientPromise;
}

async function connectToMongoDB() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error('Please add your Mongo URI to .env.local');
  }

  let cached = global.mongoose;
  if (!cached) {
    cached = global.mongoose = { conn: null, promise: null };
  }

  async function dbConnect() {
    if (cached.conn) {
      return cached.conn;
    }

    if (!cached.promise) {
      const opts = {
        bufferCommands: false,
      };

      cached.promise = mongoose.connect(uri, opts).then((mongoose) => {
        return mongoose;
      });
    }
    cached.conn = await cached.promise;
    return cached.conn;
  }

  return dbConnect;
}

export { mongodbConnectionPromise, connectToMongoDB };
