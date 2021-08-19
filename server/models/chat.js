import mongoose from 'mongoose';

const { Schema } = mongoose;

const chatSchema = new Schema(
  {
    chat_type: {
      type: String,
      default: 'dual',
    },
  },
  {
    timestamps: true,
  }
);
export default mongoose.model('Chat', chatSchema);
