import Adviser from '../models/adviser';
import User from '../models/user';
import Concern from '../models/concerns';
import config from '../config/app';

const getAdvisersByCat = async (req, res) => {
  try {
    const cat = parseInt(req.params.id);
    const advisers = await Adviser.find({ cat })
      .populate('postedBy', 'id name')
      .exec();
    res.status(200).json(advisers);
  } catch (e) {
    console.log(e.message);
    res.status(500).send(e.message);
  }
};

const getAdviserByName = async (req, res) => {
  try {
    const keyword = req.params.name
      ? {
          name: {
            $regex: req.params.name,
            $options: 'i',
          },
          user_type: 1,
        }
      : {};

    const adviser = await User.findOne({ ...keyword })
      .select('_id name')
      .exec();
    console.log(adviser);
    return res.json({
      adviser,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(400).json({
      error: error.message,
    });
  }
};

const getShowAdvisers = async (_, res) => {
  try {
    const advisers = await Adviser.find({})
      .populate('postedBy', '_id name')
      .exec();
    return res.json({
      advisers,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(400).json({
      error: error.message,
    });
  }
};

const getShowAdviserConcerns = async (req, res) => {
  const { _id: assignBy } = req.user;
  try {
    const advisers = await Concern.find({ assignBy })
      .populate('postedBy', '_id name')
      .populate('assignBy', '_id name')
      .exec();
    return res.json(advisers);
  } catch (error) {
    console.log(error.message);
    return res.status(400).json({
      error: error.message,
    });
  }
};

const getConcernByAdviser = async (req, res) => {
  const { id: _id } = req.params;
  try {
    const concern = await Concern.findOne({ _id })
      .populate('postedBy', '_id name avatar')
      .exec();
    // console.log(concern);
    if (concern.concern_file) {
      const url = `${config.appUrl}:${config.appPort}`;
      concern.concern_file = `${url}/concern/${concern.postedBy._id}/${concern.concern_file}`;
    }
    return res.json(concern);
  } catch (error) {
    console.log(error.message);
    return res.status(400).json({
      error: error.message,
    });
  }
};

export {
  getAdvisersByCat,
  getAdviserByName,
  getShowAdvisers,
  getShowAdviserConcerns,
  getConcernByAdviser,
};
