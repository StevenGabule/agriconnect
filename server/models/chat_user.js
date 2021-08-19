import mongoose from 'mongoose';

const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

const chatUserSchema = new Schema(
  {
    chatId: {
      type: ObjectId,
      required: true,
      ref: 'Chat',
    },
    userId: {
      type: ObjectId,
      required: true,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
);
export default mongoose.model('ChatUser', chatUserSchema);
