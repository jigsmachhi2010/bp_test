const dotenv = require("dotenv").config();
const { stripeDetailsForUsingApi } = require("../helper/StripeDetails");
const CURRENCY = process.env.CURRENCY;

class StripeService {
  constructor() {}

  // Creating prices using stripe price create method.
  async createPrice(payload) {
    try {
      const data = await stripeDetailsForUsingApi();
      const stripe = require("stripe")(data);

      const price = await stripe.prices.create({
        unit_amount: payload.price,
        currency: `${process.env.CURRENCY}`,
        recurring: { interval: payload.type },
        product: `${payload.product_id}`,
      });
      return price?.id;
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }

  // change public_key or secret_key
  async createProduct() {
    try {
      const data = await stripeDetailsForUsingApi();
      const stripe = require("stripe")(data);
      // console.log("data", stripe)
      const product = await stripe.products.create({
        name: "big_picture",
      });

      const price_monthly = await stripe.prices.create({
        unit_amount: 10000,
        currency: `${process.env.CURRENCY}`,
        recurring: { interval: "month" },
        product: `${product.id}`,
      });

      const price_yearly = await stripe.prices.create({
        unit_amount: 100000,
        currency: `${process.env.CURRENCY}`,
        recurring: { interval: "year" },
        product: `${product.id}`,
      });

      const product2 = await stripe.products.create({
        name: "big_picture_1",
      });

      const price_monthly2 = await stripe.prices.create({
        unit_amount: 11100,
        currency: `${process.env.CURRENCY}`,
        recurring: { interval: "month" },
        product: `${product2.id}`,
      });

      const price_yearly2 = await stripe.prices.create({
        unit_amount: 199900,
        currency: `${process.env.CURRENCY}`,
        recurring: { interval: "year" },
        product: `${product2.id}`,
      });

      let idData = [
        {
          product_id: product.id,
          monthly_price_id: price_monthly.id,
          yearly_price_id: price_yearly.id,
        },
        {
          product_id: product2.id,
          monthly_price_id: price_monthly2.id,
          yearly_price_id: price_yearly2.id,
        },
      ];

      return idData;
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }
}

module.exports = new StripeService();
