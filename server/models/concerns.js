import mongoose from 'mongoose';

const { Schema } = mongoose;
const { String, Number, Date, Buffer, ObjectId } = Schema.Types;

const concernSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
      maxLength: 10000,
    },
    concern_file: {
      type: String,
    },
    postedBy: {
      type: ObjectId,
      ref: 'User',
    },
    assignBy: {
      type: ObjectId,
      ref: 'User',
    },
    progress: {
      type: Number,
      default: 0,
    },
    label: {
      type: Number,
      default: 1,
    },
    status: {
      type: Number,
      default: 3, // 1-approve|2-disapproved|3-pending
    },
    completed_date: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('Concern', concernSchema);
