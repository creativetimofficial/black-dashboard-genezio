import * as dotenv from "dotenv";

dotenv.config()

export const MONGO_DB_URI = process.env.DB_URI
export const smtpConf = {
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: process.env.SMTP_SSL,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
};
export const secret = process.env.SECRET;
