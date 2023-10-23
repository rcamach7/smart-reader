import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;

if (!uri) {
  throw new Error('Please add your Mongo URI to .env.local');
}
console.log('MongoDB URI:', uri);

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

export default clientPromise;
