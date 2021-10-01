import mongoose from 'mongoose';

const { Schema } = mongoose;
const { ObjectId } = mongoose.Schema;

const adviserClientSchema = new Schema({
  postedBy: {
    type: ObjectId,
    ref: 'User',
  },
});

export default mongoose.model('AdviserClient', adviserClientSchema);
