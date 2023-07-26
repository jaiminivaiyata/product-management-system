import dotenv from "dotenv";
import path from "path";

dotenv.config({
    path: path.join(__dirname, `../../${process.env.NODE_ENV && process.env.NODE_ENV !== "development" ? process.env.NODE_ENV : ""}.env`)
})

interface Config {
  env: string,
  port: string,
  mongoose: {
    url: string,
    options: {
      useNewUrlParser: boolean,
      useUnifiedTopology: boolean,
      maxPoolSize: number
    }
  },
  jwt: {
    secret: string,
    accessExpirationMinutes: string,
    refreshExpirationDays: string
  }
}

export const config : Config = {
  env: process.env.NODE_ENV,
  port: process.env.PORT,
  mongoose: {
    url: process.env.MONGODB_URL + (process.env.NODE_ENV === 'test' ? '-test' : ''),
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      maxPoolSize: 10
    },
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    accessExpirationMinutes: process.env.JWT_ACCESS_EXPIRATION_MINUTES,
    refreshExpirationDays: process.env.JWT_REFRESH_EXPIRATION_DAYS
  },
}
