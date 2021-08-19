import User from '../models/user';
import Adviser from '../models/adviser';

const showProfile = async (req, res) => {
  let account = null;
  try {
    if (req.user.user_type === 1) {
      account = await Adviser.findOne({
        postedBy: req.user._id,
      })
        .populate('postedBy', '-password')
        .exec();
    } else {
      account = await User.findById(req.user._id).select('-password').exec();
    }

    return res.json(account);
  } catch (error) {
    console.log(error.message);
    return res.status(400).send('Something goes wrong!');
  }
};

export { showProfile };
