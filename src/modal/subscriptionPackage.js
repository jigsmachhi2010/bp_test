const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { ObjectId } = mongoose.Schema.Types;

const SubscriptionPackageSchema = new Schema({
  userId: {
    type: ObjectId,
    ref: "Users",
  },
  name: {
    type: String,
    trim: true,
  },
  monthly_price: {
    type: Number,
    trim: true,
  },
  yearly_price: {
    type: Number,
    trim: true,
  },
  package_info: {
    type: String,
    trim: true,
  },
  is_free: {
    type: Boolean,
    default: false,
  },
  monthly_price_id: {
    type: String,
    trim: true,
  },
  yearly_price_id: {
    type: String,
    trim: true,
  },
  stripe_product_id: {
    type: String,
    trim: true,
  },
  trial_days: {
    type: Number,
    default: null,
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
SubscriptionPackageSchema.pre("edit", function () {
  this.update(
    {},
    {
      $set: {
        updated_at: new Date(),
      },
    }
  );
});

module.exports = mongoose.model(
  "SubscriptionPackage",
  SubscriptionPackageSchema
);
