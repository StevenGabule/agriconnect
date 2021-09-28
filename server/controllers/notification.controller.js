import Nofitication from '../models/notification.model';

export const createToken = async (req, res) => {
  console.log(req.body);
  try {
    return res.status(201).send('Yes!');
  } catch (error) {
    console.log(error.message);
    return res.status(500).send(error.message);
  }
};
