import mongoose from 'mongoose';

const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

const SubscriptionnModel = new Schema(
  {
    userId: {
      type: ObjectId,
      ref: 'User',
      required: true,
    },
    subscriptionType: {
      type: Number,
      default: 1,
    },

    startdDate: {
      type: Date,
      default: Date.now(),
    },

    expiredDate: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);
export default mongoose.model('Subscription', SubscriptionnModel);
