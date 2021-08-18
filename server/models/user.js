import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

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

    user_status: {
      type: Boolean,
      default: false, // determine if the user is active/inactive
    },

    user_type: {
      type: Number,
      default: 2, // 0-admin|1-adviser|2-client
    },

    avatar: {
      type: String,
    },

    company: {
      type: String,
      required: true,
    },

    company_type: {
      type: Number,
      required: true,
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
