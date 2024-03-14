import * as dotenv from 'dotenv';

// Set the NODE_ENV to 'development' by default
// process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const envFound = dotenv.config();
if (!envFound) {
  throw new Error("⚠️  Couldn't find .env file  ⚠️");
}

export default () => ({
  port: process.env.PORT || 3000,
  mysqlConfig: {
    master: {
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      poolSize: 3,
    },
    slave: {
      host: process.env.DB_HOST_SLAVE,
      port: parseInt(process.env.DB_PORT_SLAVE),
      user: process.env.DB_USER_SLAVE,
      password: process.env.DB_PASSWORD_SLAVE,
      database: process.env.DB_NAME_SLAVE,
      poolSize: 3,
    },
  },
});
