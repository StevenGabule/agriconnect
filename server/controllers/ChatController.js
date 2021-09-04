import User from '../models/user';
import Chat from '../models/chat';
import ChatUser from '../models/chat_user';
import Message from '../models/message';
import mongoose from 'mongoose';

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
    var lists = await Chat.find({
      users: { $elemMatch: { $eq: req.user._id } },
    })
      .populate('users')
      .populate('latestMessage')
      .sort({ updatedAt: -1 });
    lists = await User.populate(lists, { path: 'latestMessage.sender' });
    return res.status(200).json(lists);
  } catch (err) {
    console.log(err.message);
    return res.send(err.message);
  }
};

const getChatUsers = async (req, res) => {
  try {
    const userId = req.user._id;
    const chatId = req.params.chatId;

    const isValid = mongoose.isValidObjectId(chatId);

    if (!isValid) {
      return res
        .status(400)
        .send('Chat does not exists or you do not have permission to view it.');
    }

    let chat = await Chat.findOne({
      _id: chatId,
      users: {
        $elemMatch: { $eq: userId },
      },
    }).populate('users');

    if (chat == null) {
      const userFound = await User.findById(chatId);
      if (userFound != null) {
        chat = await getChatUserId(userId, chatId);
        return res.status(201).json({
          chat,
        });
      }

      return res.status(400).json({
        message: 'Oops! Something went wrong!',
      });
    }
    if (chat == null) {
      return res
        .status(400)
        .send('Chat does not exists or you do not have permission to view it.');
    }
    return res.json({
      chat,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(400).json({
      err: error.message,
    });
  }
};

function getChatUserId(userLoggedInId, otherUserId) {
  return Chat.findOneAndUpdate(
    {
      isGroupChat: false,
      users: {
        $size: 2,
        $all: [
          { $elemMatch: { $eq: mongoose.Types.ObjectId(userLoggedInId) } },
          { $elemMatch: { $eq: mongoose.Types.ObjectId(otherUserId) } },
        ],
      },
    },
    {
      $setOnInsert: {
        users: [userLoggedInId, otherUserId],
      },
    },
    {
      new: true,
      upsert: true,
    }
  ).populate('users');
}

const changeChatName = async (req, res) => {
  try {
    const response = await Chat.findByIdAndUpdate(req.params.chatId, req.body);
    console.log(response);
    return res.status(204).json(response);
  } catch (error) {
    console.log(error.message);
    return res.status(400).send(error.message);
  }
};

const getChats = async (req, res) => {
  try {
    const chats = await Chat.findOne({
      _id: req.params.chatId,
      users: {
        $elemMatch: {
          $eq: req.user._id,
        },
      },
    }).populate('users');
    return res.status(200).json(chats);
  } catch (error) {
    console.log(error.message);
    return res.status(400).send(error.message);
  }
};

export { create, lists, getChatUsers, changeChatName, getChats };
