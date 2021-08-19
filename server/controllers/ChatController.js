import User from '../models/user';
import Chat from '../models/chat';
import ChatUser from '../models/chat_user';
import Message from '../models/message';

const create = async (req, res) => {
  try {
    // ChatUser.deleteMany();
    // Chat.deleteMany();
    // process.exit();

    const user = await User.findOne(req.user._id).populate('');

    const chat = await new Chat({ type: 'dual' });
    const newChat = await chat.save();
    if (chat) {
      const arr = [
        {
          chatId: newChat._id,
          userId: req.user._id,
        },
        {
          chatId: newChat._id,
          userId: req.body.clientId,
        },
      ];
      await ChatUser.insertMany(arr);
      return res.json('ok');
    }
    return res.send('Oops!!');
  } catch (error) {
    console.log(error.message);
    return res.send(error.message);
  }
};

export { create };
