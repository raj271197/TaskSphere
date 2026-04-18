export const env = {
  mongodbUri: process.env.MONGODB_URI?.trim() ?? '',
  mongodbDb: process.env.MONGODB_DB?.trim() || 'tasksphere',
  apiBaseUrl: process.env.NEXT_PUBLIC_API_BASE_URL?.trim() ?? '',
  enableFileFallback: process.env.ENABLE_FILE_FALLBACK !== 'false',
};

export const hasMongoConfig = () => Boolean(env.mongodbUri);
