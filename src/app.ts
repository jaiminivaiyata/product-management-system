import express from "express";
import compression from "compression";
import cors from "cors";
import helmet from "helmet";

import router from "./routes/v1"
import { connectDatabase } from "./general-resources/db-config";
import {pathNotFoundHandler, errorHandler, errorConverter} from "./middlewares/error"

connectDatabase();
const app = express();

// To set security HTTP headers
app.use(helmet());

//To parse json request body
app.use(express.json());

//To parse urlencoded request body
app.use(express.urlencoded({extended: true}));

//To enable cors
app.use(cors());
app.options("*", cors());

// gzip compression
app.use(compression());

// v1 api routes
app.use("/v1", router());

// route middlewares
// send back a 404 error for any unknown api request
app.use(pathNotFoundHandler);

// convert error to ApiError, if needed
app.use(errorConverter);


// handle error
app.use(errorHandler);



export default app;