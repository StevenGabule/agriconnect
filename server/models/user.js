import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import moment from 'moment';

const { Schema } = mongoose;
const { String, Number, Date } = Schema.Types;

const userSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
    },

    email: {
      type: String,
      trim: true,
      unique: true,
      required: true,
    },

    password: {
      type: String,
      required: true,
    },

    contact_no: {
      type: String,
      unique: true,
      required: true,
    },

    user_type: {
      type: Number,
      default: 2, // 3-admin|1-adviser|2-client
    },

    avatar: {
      type: String,
      default: null,
    },

    company: {
      type: String,
    },

    company_type: {
      type: Number,
      default: 1, // 1-individual|2-company
    },

    location: {
      type: String,
      required: true,
    },

    deleted_at: {
      type: Date,
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform(_, ret) {
        ret.createdForHuman = moment(ret.createdAt).fromNow();
        ret.createdFormatted = moment(ret.createdAt).format('MMM Do YY');
        delete ret.__v;
        delete ret.password;
      },
    },
  }
);

// hash password when saving information of user
userSchema.pre('save', function (next) {
  let user = this;
  if (user.isModified('password')) {
    return bcrypt.hash(user.password, 12, function (err, hash) {
      if (err) {
        console.log('Bcrypt hash error:', err);
        return next(err);
      }
      user.password = hash;
      return next();
    });
  } else {
    return next();
  }
});

// compare user password in login request
userSchema.methods.comparePassword = function (password, next) {
  bcrypt.compare(password, this.password, function (err, match) {
    if (err) {
      console.log('Compare password:', err);
      return next(err, false);
    }
    return next(null, match);
  });
};

export default mongoose.model('User', userSchema);
