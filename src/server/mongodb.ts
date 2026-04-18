import { MongoClient, ServerApiVersion } from 'mongodb';

import { env, hasMongoConfig } from '@/lib/env';

declare global {
  // eslint-disable-next-line no-var
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

let client: MongoClient | undefined;

const createClient = () => {
  if (!hasMongoConfig()) {
    throw new Error('MONGODB_URI is not configured.');
  }

  return new MongoClient(env.mongodbUri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
  });
};

export const getMongoClient = async () => {
  if (global._mongoClientPromise) {
    return global._mongoClientPromise;
  }

  client ??= createClient();
  global._mongoClientPromise = client.connect();

  return global._mongoClientPromise;
};
