const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
    trim: true,
  },
  token: {
    type: String,
    default: "",
  },
  phone_number: {
    type: String,
    trim: true,
  },
  email: {
    type: String,
    trim: true,
  },
  password: {
    type: String,
    trim: true,
  },
  is_admin: {
    type: Boolean,
    default: false,
  },
  is_superadmin: {
    type: Boolean,
    default: false,
  },
  reset_tokens: {
    type: Object,
    default: null,
    reset_password_token: {
      token: {
        type: String,
        default: null,
      },
      expiry: {
        type: Date,
        default: null,
      },
    },
  },
  file: {
    type: String,
    default: null,
  },
  smtp_email: {
    type: String,
    trim: true,
  },
  smtp_password: {
    type: String,
    trim: true,
  },
  user_status: {
    type: Boolean,
    default: true,
  },
  permission: {
    type: Array,
    default: [],
  },
  stripe_public_key: {
    type: String,
    trim: true,
  },
  stripe_secret_key: {
    type: String,
    trim: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  updated_at: {
    type: Date,
    default: Date.now,
  },
});
UserSchema.pre("update", function () {
  this.update(
    {},
    {
      $set: {
        updated_at: new Date(),
      },
    }
  );
});

module.exports = mongoose.model("User", UserSchema);
