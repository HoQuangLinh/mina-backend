import * as dotenv from 'dotenv';

dotenv.config();
export const envConfig = {
  client: {
    url: process.env.CLIENT_URL,
  },
  server: {
    url: process.env.SERVER_URL,
  },
  jwt: {
    expireIn: process.env.JWT_SECRET_EXPIRE_IN || '1d',
    secret: process.env.JWT_SECRET_KEY,
  },
  google: {
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackUrl: `${process.env.SERVER_URL}/api/auth/google/redirect`,
  },
  password: {
    saltRound: process.env.SAT_ROUND_PASSWORD || '10',
  },
};
