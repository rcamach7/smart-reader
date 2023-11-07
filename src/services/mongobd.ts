import mongoose from 'mongoose';

async function connectToMongoDB() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error('Please add your Mongo URI to .env.local');
  }

  // Check if we have a connection to the database or if it's currently
  // connecting or disconnecting (in which case we don't want to initiate a new connection)
  if (mongoose.connection.readyState >= 1) {
    return mongoose.connection;
  }

  // If there's no connection, check if we're in development mode and use a cached promise
  if (process.env.NODE_ENV === 'development') {
    if (!global._mongoosePromise) {
      global._mongoosePromise = mongoose
        .connect(uri, {
          bufferCommands: false,
        })
        .then((mongoose) => mongoose);
    }
    await global._mongoosePromise;
  } else {
    // In production, check if the existing promise is still pending, if not, connect anew.
    if (!global._mongooseProdPromise || mongoose.connection.readyState === 0) {
      global._mongooseProdPromise = mongoose
        .connect(uri, {
          bufferCommands: false,
        })
        .then((mongoose) => mongoose);
    }
    await global._mongooseProdPromise;
  }

  return mongoose.connection;
}

export { connectToMongoDB };
