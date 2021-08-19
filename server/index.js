require('dotenv').config();

import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import router from './routes/index';

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
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/uploads'));

app.use('/api', router);

const port = process.env.PORT;

app.listen(port, () => console.log(`App is listening to port: ${port}`));
