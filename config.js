import dotenv from 'dotenv';

dotenv.config();

const config = {
  NODE_ENV:    process.env.NODE_ENV    || 'development',
  PORT:        process.env.PORT        || 3000,
  MONGODB_URI: {
    production: process.env.MONGODB_URI_PROD   || 'mongodb://localhost/chat-app',
    development: process.env.MONGODB_URI_DEV   || 'mongodb://localhost/chat-app',
  }
  // HOST:        process.env.HOST        || '127.0.0.1',
}

export default config;