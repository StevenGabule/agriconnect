import mongoose from 'mongoose';

const { Schema } = mongoose;
const { String } = Schema.Types;

const notificationModel = new Schema({
  token: {
    type: String,
    required: true,
  },
});
export default mongoose.model('Notification', notificationModel);
