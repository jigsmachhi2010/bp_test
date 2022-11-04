const ResponseHandler = require("../handlers/responsehandlers");
const MSGConst = require("../constants/messageconstants");
const Package = require("../models/SuperAdmin/package");
const env = require("dotenv").config();
const stripe_service = require("../service/stripe");
const subscription_model = require("../models/subscribe");
const invoice_model = require("../models/invoice");
const auth_model = require("../models/auth");
const user_model = require("../models/user");
const webhook_model = require("./../modal/webhooks_logs");
const quote = require("../models/quote");
const { getCurrentTime } = require("../helpers/helpers");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const io = require("socket.io");

class WebhookController {
  constructor() {}

  async index(req, res) {
    try {
      let data;
      let eventType;
      data = req.body.data;
      eventType = req.body.type;
    //   await subscription_model.webhooklog(data, eventType);
      switch (eventType) {
        case "customer.subscription.updated":
          const subscription = data.object;
          const subscription_id = subscription.id;
          const metadata = subscription.metadata;

          if (metadata.reason === "add_subuser" && metadata.sub_user_id) {
            let invoice_id = subscription.latest_invoice;
            let amount = await stripe_service.getAmountFromInvoice(invoice_id);
            webhook_model.assignSubUserSubscriptionId(
              subscription,
              metadata.sub_user_id,
              amount.amount_due,
              "Subuser add",
              "User"
            );
            await stripe_service.subscriptionMetadataUpdate(
              subscription_id,
              metadata
            );
          } else if (metadata.reason === "upgrade_subscription") {
            let invoice_id = subscription.latest_invoice;
            let amount = await stripe_service.getAmountFromInvoice(invoice_id);
            const autoRenew = subscription.cancel_at_period_end ? 0 : 1;
            await webhook_model.removeOldSubscription(
              subscription_id,
              metadata.id
            );
            await webhook_model.assignSubUserSubscriptionId(
              subscription,
              metadata.sub_user_id,
              amount.amount_due,
              "Yearly",
              "Subscription",
              autoRenew
            );
            await stripe_service.subscriptionMetadataUpdate(
              subscription_id,
              metadata
            );
            io.emit("subscription_upgrade", "subscription_upgrade");
          }

          break;
        case "invoice.finalized":
          const invoice_finalized = data.object;
          if (invoice_finalized.billing_reason === "subscription_cycle") {
            webhook_model.renew_packge(invoice_finalized);
            io.emit("subscription_upgrade", "renew subscription");
          }
        case "invoice.payment_succeeded":
          const invoice = data.object;
          const invoice_amount = invoice.amount_due;
          const invoice_id = invoice.id;
          const quote = invoice.quote;
          const Invoicestatus = invoice.status;
          if (invoice.billing_reason === "subscription_update") {
            // var subscription_invoice = invoice.subscription;
            webhook_model.updatePackage(invoice.subscription, invoice.total);
            io.emit("subscription_upgrade", "subscription_upgrade");
          }

          if (invoice_id !== null) {
            const table_prefix = invoice.metadata.table_prefix;
            const user_id = invoice.metadata.id;
            if (table_prefix !== undefined && table_prefix !== null) {
              await invoice_model.UpdateInvoicePaymentStatus(
                invoice_id,
                Invoicestatus,
                table_prefix,
                user_id
              );

              await stripe_service.chargeCustomerForInvoice(
                invoice.metadata,
                invoice_id,
                table_prefix,
                invoice_amount
              );
            }
          }

          break;
        case "invoice.payment_failed":
          const invoice_failed = data.object;
          const invoice_failed_amount = invoice_failed.amount_due;
          const invoice_failed_subscription_id = invoice_failed.subscription;
          const invoice_failed_status = invoice_failed.status;
          if (invoice_failed_subscription_id !== null) {
            await subscription_model.renew_packge(
              invoice_failed_subscription_id,
              invoice_failed_amount,
              "payment_failed"
            );
            io.emit("subscription_upgrade", "subscription_payment_failed");
          }

          const invoice_id_failed = invoice_failed.id;
          const quote_failed = invoice_failed.quote;
          const Invoicestatus_failed = invoice_failed.status;

          if (invoice_id_failed !== null && quote_failed !== null) {
            const table_prefixQ = invoice_failed.metadata.table_prefix;
            const user_idQ = invoice_failed.metadata.id;
            if (table_prefixQ !== undefined && table_prefixQ !== null) {
              await invoice_model.UpdateInvoicePaymentStatus(
                invoice_id_failed,
                Invoicestatus_failed,
                table_prefixQ,
                user_idQ
              );
            }
          }

          break;
        default:
          console.log(eventType);
      }

      res.sendStatus(200);
    } catch (error) {
      res.sendStatus(304);
    }
  }
}

module.exports = new WebhookController();
