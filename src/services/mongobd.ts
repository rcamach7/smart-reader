import mongoose from 'mongoose';

async function connectToMongoDB() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error('Please add your Mongo URI to .env.local');
  }

  // Use a cached promise to prevent multiple connections during development
  if (process.env.NODE_ENV === 'development') {
    if (!global._mongoosePromise) {
      global._mongoosePromise = mongoose.connect(uri, {
        bufferCommands: false, // Disable mongoose buffering
      });
    }
    await global._mongoosePromise;
  } else {
    // In production, always create a new connection
    await mongoose.connect(uri, {
      bufferCommands: false,
    });
  }

  return mongoose.connection;
}

export { connectToMongoDB };
