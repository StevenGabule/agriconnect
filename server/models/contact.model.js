import mongoose from 'mongoose';
import moment from 'moment';
const { Schema } = mongoose;
const { String, ObjectId } = Schema.Types;

const ContactSchema = new Schema(
  {
    sendBy: {
      type: ObjectId,
      ref: 'User',
    },

    receivedBy: {
      type: ObjectId,
      ref: 'User',
    },

    content: {
      type: String,
      trim: true,
    },

    readAt: {
      type: Date,
      default: null,
    },

    status: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform(_doc, ret) {
        ret.createdForHuman = moment(ret.createdAt).fromNow();
        delete ret.__v;
      },
    },
  }
);
export default mongoose.model('Contact', ContactSchema);
