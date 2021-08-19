import mongoose from 'mongoose';

const { Schema } = mongoose;
const { String, ObjectId } = Schema.Types;

const messageSchema = new Schema(
  {
    message_type: {
      type: String,
      default: 'text',
    },
    message: {
      type: String,
    },
    chatId: {
      type: ObjectId,
      ref: 'Chat',
      required: true,
    },
    fromUserId: {
      type: ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
export default mongoose.model('Message', messageSchema);
