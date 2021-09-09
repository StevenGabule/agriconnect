import Message from '../models/message';
import Chat from '../models/chat';

const create = async (req, res) => {
  try {
    if (!req.body.content || !req.body.chatId) {
      return res.status(400).send('All fields are required!');
    }

    const newMessage = {
      sender: req.user._id,
      content: req.body.content,
      chat: req.body.chatId,
    };

    var message = await Message.create(newMessage);
    message = await message.populate('sender').execPopulate();
    message = await message.populate('chat').execPopulate();
    message = await User.populate(message, { path: 'chat.users' });

    await Chat.findByIdAndUpdate(req.body.chatId, { latestMessage: message });

    return res.status(201).json(message);
  } catch (error) {
    console.log(error.message);
    return res.status(400).send(error.message);
  }
};

const getMessageChat = async (req, res) => {
  try {
    const messages = await Message.find({ chat: req.params.chatId }).populate(
      'sender'
    );
    return res.status(200).json(messages);
  } catch (error) {
    console.log(error.message);
    return res.status(400).send(error.message);
  }
};

export { create, getMessageChat };
