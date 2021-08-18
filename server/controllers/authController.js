import User from '../models/user';
import jwt from 'jsonwebtoken';
const register = async (req, res) => {
  try {
    const {
      name,
      email,
      contact_no,
      password,
      company,
      company_type,
      location,
    } = req.body;

    if (
      !name ||
      !company ||
      !password ||
      !email ||
      !company_type ||
      !location ||
      !contact_no
    ) {
      return res.status(400).send('Fields is required!');
    }

    if (!password || password.length < 6) {
      return res
        .status(400)
        .send('Password is required and should be min 6 characters long!');
    }
    let userExist = await User.findOne({ email });
    if (userExist) {
      return res.status(400).send('Email is already taken!');
    }

    let contactNoExist = await User.findOne({ contact_no });
    if (contactNoExist) {
      return res.status(400).send('Contact number is already taken!');
    }

    const user = new User(req.body);
    const newUser = await user.save();
    return res.json({ user: newUser });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      error: error.message,
    });
  }
};

const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    let user = await User.findOne({
      $and: [{ $or: [{ email: username }, { contact_no: username }] }],
    }).exec();

    if (!user) return res.status(400).send('Email not found!');

    user.comparePassword(password, (err, match) => {
      if (!match || err) {
        return res.status(400).send('The credentails are not found!');
      }
      let token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
        expiresIn: '7d',
      });

      // remove the password to the response request
      user.password = undefined;

      return res.json({
        token,
        user,
      });
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      error: error.message,
    });
  }
};

export { login, register };
