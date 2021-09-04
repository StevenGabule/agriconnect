import mongoose from 'mongoose';

const { Schema } = mongoose;
const { String, ObjectId } = Schema.Types;

const messageSchema = new Schema(
  {
    sender: {
      type: ObjectId,
      ref: 'User',
    },
    content: {
      type: String,
      trim: true,
    },
    chat: {
      type: ObjectId,
      ref: 'Chat',
    },
    readBy: {
      type: ObjectId,
      ref: 'User',
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform(doc, ret) {
        delete ret.__v;
      },
    },
  }
);
export default mongoose.model('Message', messageSchema);
