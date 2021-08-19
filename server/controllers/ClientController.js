import User from '../models/user';
const index = async (_, res) => {
  try {
    const users = await User.find({}).exec();
    return res.json(users);
  } catch (error) {
    console.log(error.message);
    return res.status(400).send('Something goes wrong!');
  }
};

export { index };
