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
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/uploads'));

app.use('/api', router);

const port = process.env.PORT;

const server = app.listen(port, () =>
  console.log(`App is listening to port: ${port}`)
);

const io = require('socket.io')(server, { pingTimeout: 60000 });

io.on('connection', (socket) => {
  socket.on('setup', (userData) => {
    socket.join(userData._id);
    socket.emit('connected');
  });

  socket.on('join room', () => socket.join(room));
  socket.on('typing', (room) => socket.in(room).emit('typing'));
  socket.on('stop typing', (room) => socket.in(room).emit('stop typing'));

  socket.on('new message', (newMessage) => {
    var chat = newMessage.chat;
    if (!chat.users) return console.log('chat.users not defined!');

    chat.users.forEach((user) => {
      if (user._id == newMessage.sender._id) return;
      socket.in(user._id).emit('message received', newMessage);
    });
  });
});
