import moment from 'moment';
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
      default: 1, // 1=one|2-monthly|3-yearly
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
    toJSON: {
      transform(_doc, ret) {
        ret.createdForHuman = moment(ret.createdAt).fromNow();
        ret.subscriptionStart = moment(ret.startdDate).format('MMM Do YY');
        ret.subscriptionEnd =
          ret.expiredDate != null
            ? moment(ret.expiredDate).format('MMM Do YY')
            : 'N/A';

        delete ret.__v;
        delete ret.createdAt;
        delete ret.startdDate;
        delete ret.expiredDate;
      },
    },
  }
);
export default mongoose.model('Subscription', SubscriptionnModel);
