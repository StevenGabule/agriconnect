import User from '../models/user';
import Adviser from '../models/adviser';
import Concerns from '../models/concerns';
import Subscription from '../models/subscription.model';
import mongoose from 'mongoose';

const adminConcernsHandler = async (_req, res) => {
  try {
    const concerns = await Concerns.find({})
      .populate('postedBy')
      .populate('assignBy')
      .sort({ createdAt: -1 })
      .exec();
    return res.json(concerns);
  } catch (error) {
    console.log(error.message);
    return res.status(400).send(error.message);
  }
};

const adminConcernsFetchHandler = async (req, res) => {
  try {
    const { id: _id } = req.params;
    const concerns = await Concerns.findOne({ _id })
      .populate('postedBy')
      .populate('assignBy')
      .exec();
    return res.json(concerns);
  } catch (error) {
    console.log(error.message);
    return res.status(400).send(error.message);
  }
};

const adminGetAdvisers = async (_req, res) => {
  try {
    const advisers = await Adviser.find({}).populate('postedBy').exec();
    return res.json(advisers);
  } catch (error) {
    console.log(error.message);
    return res.status(400).send(error.message);
  }
};

const adminGetAdvisersClient = async (req, res) => {
  try {
    const { id: assignBy } = req.params;
    const customers = await Concerns.find({ assignBy })
      .select('_id postedBy')
      .populate('postedBy', '_id name contact_no email')
      .exec();
    return res.json(customers);
  } catch (error) {
    console.log(error.message);
    return res.status(400).send(error.message);
  }
};

const adminGetAllSubscribers = async (_req, res) => {
  try {
    const subscribers = await Subscription.find().populate('userId').exec();
    return res.json(subscribers);
  } catch (error) {
    console.log(error.message);
    return res.status(400).send(error.message);
  }
};

const adminGetAllUsers = async (_req, res) => {
  try {
    const users = await User.find({ user_type: 2 }).exec();
    return res.json(users);
  } catch (error) {
    console.log(error.message);
    return res.status(400).send(error.message);
  }
};

const adminAdvicerAllClient = async (req, res) => {
  try {
    const { adviserId } = req.params;
    const result = await Concerns.aggregate([
      { $match: { assignBy: mongoose.Types.ObjectId(adviserId) } },
      {
        $group: {
          _id: null,
          postedBy: { $addToSet: '$postedBy' },
        },
      },
    ]).exec();
    const clientIds = result[0].postedBy;
    const clients = await User.find({
      _id: { $in: clientIds },
    }).exec();

    return res.json(clients);
  } catch (error) {
    console.log(error.message);
    return res.status(400).send(error.message);
  }
};

const adminGetAllUserPost = async (req, res) => {
  try {
    const { id: postedBy } = req.params;
    const concerns = await Concerns.find({ postedBy })
      .populate('assignBy')
      .populate('postedby')
      .exec();
    return res.json(concerns);
  } catch (error) {
    console.log(error.message);
    return res.status(400).send(error.message);
  }
};

const getAllSubcribersHandler = async (req, res) => {
  try {
    let oneTime = 0;
    let monthly = 0;
    let yearly = 0;

    const subscribers = await Subscription.countDocuments().exec();
    const advisers = await Adviser.countDocuments().exec();
    const concerns = await Concerns.countDocuments().exec();
    const clients = await User.countDocuments({ user_type: 2 }).exec();

    const subscribersCheck = await Subscription.find().exec();

    subscribersCheck.map(({ subscriptionType }) => {
      if (subscriptionType == 1) {
        oneTime++;
      }
      if (subscriptionType == 2) {
        monthly++;
      }
      if (subscriptionType == 3) {
        yearly++;
      }
    });

    return res.json({
      subscribers,
      advisers,
      concerns,
      clients,
      oneTime,
      monthly,
      yearly,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(400).send(error.message);
  }
};

export {
  adminConcernsHandler,
  adminConcernsFetchHandler,
  adminGetAdvisers,
  adminGetAdvisersClient,
  adminGetAllSubscribers,
  adminGetAllUsers,
  adminAdvicerAllClient,
  adminGetAllUserPost,
  getAllSubcribersHandler,
};
