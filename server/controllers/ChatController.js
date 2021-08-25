import User from '../models/user';
import Chat from '../models/chat';
import ChatUser from '../models/chat_user';
import Message from '../models/message';

const create = async (req, res) => {
  try {
    let users = [req.user._id, req.body.selectorId];
    if (users.length == 0) {
      console.log('Users array is empty!');
      return res.status(400).send('Users are not found!');
    }

    var chatData = {
      users,
      isGroupChat: true,
    };
    const chats = await Chat.create(chatData);
    return res.status(201).json(chats);
  } catch (err) {
    console.log(err.message);
    return res.send(err.message);
  }
};

const lists = async (req, res) => {
  try {
    const lists = await Chat.find({
      users: { $elemMatch: { $eq: req.user._id } },
    }).populate('users');
    return res.status(200).json(lists);
  } catch (err) {
    console.log(err.message);
    return res.send(err.message);
  }
};

const getChatUsers = async (req, res) => {
  const userId = req.user._id;
  const chatId = req.params.chatId;
  const chat = await Chat.findOne({
    _id: childId,
    users: {
      $elemMatch: { $eq: userId },
    },
  });
  if (chat == null) {
    return res.status(400).json({
      message: 'Oops! Something went wrong!',
    });
  }
  return res.json({
    chat,
  });
};

export { create, lists, getChatUsers };
