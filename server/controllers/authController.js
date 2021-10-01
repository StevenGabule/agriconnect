import User from '../models/user';
import Advicer from '../models/adviser';
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
      user_type,
    } = req.body;

    if (
      !name ||
      !company ||
      !password ||
      !email ||
      !company_type ||
      !location ||
      !user_type ||
      !contact_no
    ) {
      return res.status(400).send('Fields is required!');
    }

    if (!password || password.length < 6) {
      console.log('Password is required and should be min 6 characters long!');
      return res
        .status(400)
        .send('Password is required and should be min 6 characters long!');
    }

    let userExist = await User.findOne({ email });

    if (userExist) {
      console.log('Email is already taken!');
      return res.status(400).send('Email is already taken!');
    }

    let contactNoExist = await User.findOne({ contact_no });
    if (contactNoExist) {
      console.log('Contact number is already taken!');
      return res.status(400).send('Contact number is already taken!');
    }

    const user = new User({
      name,
      email,
      contact_no,
      password,
      company,
      company_type,
      location,
      user_type,
    });

    const newUser = await user.save();

    // check if the user type is 1 for adviser account
    if (parseInt(user_type) === 1) {
      // if user type equal to 1 then record the account corresponding the user id of the new created account
      const {
        skills,
        course,
        biography,
        birthdate,
        employment_type,
        school_at,
        field_of_study,
        start_date_study,
        end_date_study,
        resume,
      } = req.body;
      if (
        !skills ||
        !course ||
        !biography ||
        !birthdate ||
        !employment_type ||
        !school_at ||
        !field_of_study ||
        !start_date_study ||
        !end_date_study ||
        !resume
      ) {
        return res.status(400).send('Fields is required!');
      }

      const adviser = new Advicer({
        skills,
        course,
        biography,
        birthdate,
        employment_type,
        school_at,
        field_of_study,
        start_date_study,
        end_date_study,
        resume,
      });

      adviser.postedBy = newUser._id;
      const newAdvicer = await adviser.save();
      return res.json({ user, newAdvicer });
    }
    console.log(newUser);
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
      let token = jwt.sign(
        { _id: user._id, user_type: user.user_type },
        process.env.JWT_SECRET,
        {
          expiresIn: '7d',
        }
      );

      // remove the password to the response request
      user.password = undefined;

      return res.json({
        token,
        user,
      });
    });
  } catch (error) {
    console.log(error.message);
    return res.status(400).json({
      error: error.message,
    });
  }
};

export { login, register };
