import Subscription from '../models/subscription.model';
import moment from 'moment';

export const createSubscriptionHandler = async (req, res) => {
  try {
    console.log(req.body);
    const { subscriptionType } = req.body;
    const today = Date.now();
    req.body.userId = req.user._id;

    if (parseInt(subscriptionType) === 2) {
      req.body.expiredDate = moment(today).add(1, 'M');
    }

    if (parseInt(subscriptionType) === 3) {
      req.body.expiredDate = moment(today).add(1, 'y');
    }

    const subscription = await Subscription.create(req.body);
    return res.status(201).json(subscription);
  } catch (error) {
    console.log(error.message);
    return res.status(400).send(error.message);
  }
};
