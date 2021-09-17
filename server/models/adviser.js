import mongoose from 'mongoose';

const { Schema } = mongoose;
const { ObjectId } = mongoose.Schema;

const adviserSchema = new Schema({
  postedBy: {
    type: ObjectId,
    ref: 'User',
  },

  adviser_status: {
    type: Boolean,
    default: false, // determine if the user is active/inactive
  },

  skills: {
    type: [String],
    required: true,
  },
  course: {
    type: String,
    required: true,
  },
  biography: {
    type: String,
    required: true,
  },
  birthdate: {
    type: String,
    required: true,
  },
  employment_type: {
    type: Number,
    required: true, // 1-full-time,2-part-time, 3-freelance,4-contract,5-seasonal
  },
  school_at: {
    type: String,
    required: true,
  },
  field_of_study: {
    type: String,
    required: true,
  },
  start_date_study: {
    type: String,
    required: true,
  },
  end_date_study: {
    type: String,
    required: true,
  },
  resume: {
    type: String,
    required: true,
  },

  cat: {
    type: Number,
  },
});

export default mongoose.model('Adviser', adviserSchema);
