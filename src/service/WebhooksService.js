const { getCurrentTime } = require("../helpers/helpers");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const auth_model = require("./auth");

class Webhook {
    constructor() {}

    // async removeOldSubscription(subscription_id, user_id) {
    //     const [rows_sub, fields_insert] = await connectPool.query(
    //         `UPDATE 
    //                     user_packages
    //                 SET 
    //                     payment_type = 'upgrade' 
    //                 WHERE 
    //                     user_id = ? AND subscription_id = ?`,
    //         [user_id, subscription_id]
    //     );
    // }

    // async assignSubUserSubscriptionId(
    //     subscription,
    //     sub_user_id,
    //     amount,
    //     package_type,
    //     reference,
    //     autoRenew = null
    // ) {
    //     console.log(subscription);
    //     const subscription_id = subscription.id;
    //     const status = subscription.status;
    //     const metadata = subscription.metadata;
    //     var subscription_item_id = "";

    //     subscription_item_id = subscription.items.data[1];
    //     // if (subscription_item_id)
    //     await auth_model.assignUserPackage(metadata.id, {
    //         user_id: metadata.id,
    //         package_id: metadata.package_id,
    //         package_price: amount / 100,
    //         package_type: package_type,
    //         payment_type: status === "active" ? "paid" : status,
    //         subscription_id: subscription_id ? subscription_id : null,
    //         created_at: getCurrentTime(),
    //         updated_at: getCurrentTime(),
    //         reference: reference,
    //         autoRenew: autoRenew,
    //         sub_user_id: sub_user_id ? sub_user_id : 0,
    //     });
    //     if (subscription_item_id != null) {
    //         const [rows_sub, fields_insert] = await connectPool.query(
    //             `UPDATE 
    //                     users 
    //                 SET 
    //                     subscription_item_id = '${subscription_item_id.id}' 
    //                 WHERE 
    //                     users.id = ?`,
    //             [sub_user_id]
    //         );
    //     }
    // }

    // async renew_packge(invoice) {
    //     const user_id = invoice.lines?.data[0]?.metadata.id;
    //     const package_id = invoice.lines?.data[0]?.metadata.package_id;
    //     const package_type = invoice.lines?.data[0]?.metadata.package_type;
    //     const autoRenew = invoice.lines?.data[0]?.metadata.autoRenew;
    //     const amount = invoice.subtotal;

    //     if (user_id) {
    //         const [rows_sub, fields_insert] = await connectPool.query(
    //             `SELECT id FROM user_packages WHERE user_id = ? AND subscription_id = ?`,
    //             [user_id, invoice.subscription]
    //         );
    //         if (rows_sub.length > 0) {
    //             await auth_model.assignUserPackage(user_id, {
    //                 user_id: user_id,
    //                 package_id: package_id,
    //                 package_price: amount / 100,
    //                 package_type: package_type,
    //                 payment_type: invoice.status,
    //                 subscription_id: invoice.subscription,
    //                 created_at: getCurrentTime(),
    //                 updated_at: getCurrentTime(),
    //                 reference: "Subscription",
    //                 autoRenew: autoRenew ? 1 : 0,
    //                 sub_user_id: null,
    //             });
    //         }
    //     }
    // }

    // async updatePackage(subscription_id, total) {
    //     const [rows_sub, fields_insert] = await connectPool.query(
    //         `UPDATE 
    //                     user_packages
    //                 SET 
    //                     payment_type = 'paid' 
    //                 WHERE 
    //                     subscription_id = ? && payment_type = ?`,
    //         [subscription_id, "past_due"]
    //     );
    //     console.log(rows_sub)
    // }
}

module.exports = new Webhook();
