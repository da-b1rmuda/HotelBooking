import * as dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';

import errorMiddleware from './middleware/error.middleware.js';
import roomRouter from './routes/room.routes.js';
import additionalsRouter from './routes/additionals.routes.js';

dotenv.config();
const PORT = process.env.PORT || 8080;

const app = express();

app.use(
  cors({
    credentials: true,
    origin: process.env.CLIENT_URL,
    optionSuccessStatus: 200,
  }),
);
app.use(express.json());
app.use(cookieParser());
app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);
app.use(bodyParser.json());

app.use('/room', roomRouter)
app.use('/additionals', additionalsRouter)

app.use(errorMiddleware)

const start = () => {
  try {
    app.listen(PORT, () => console.log(`server started on port ${PORT}`));
  } catch (e) {
    console.log(e);
  }
};

start();