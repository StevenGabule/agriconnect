import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import router from './routes/index';

dotenv.config();

const app = express();
const morgan = require('morgan');

mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => console.log('DB CONNECTED!'))
  .catch((err) => console.log('DB CANNOT CONNECT BECAUSE::', err));

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(router);

const port = process.env.PORT;

app.listen(port, () => console.log(`App is listening to port: ${port}`));
