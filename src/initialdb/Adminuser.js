const userDao = require("../dao/userdao");
const bcrypt = require("bcryptjs");
const UserModel = require("../modal/user");
const SubscriptionPackageModel = require("../modal/subscriptionPackage");
const CryptoJS = require("crypto-js");

const btoa = require("btoa");

class InitialDbAdmin {
  constructor() {}

  async createAdminuser() {
    // Encrypt
    let Encrypt_smtp_password = CryptoJS.AES.encrypt(
      "szbifxelizrwzixf",
      "secret key 123"
    ).toString();

    let Encrypt_stripe_public_key = CryptoJS.AES.encrypt(
      "pk_test_51Ls2S3SJwc7CK89tCMQgovlWwAuDiqnE54oVSWpJraOhrQGwhinGPoiV5MZkufQTf9cTEBRpfqhASk9BjUmn5sBx00qnWQATOh",
      "secret key 123"
    ).toString();

    let Encrypt_stripe_secret_key = CryptoJS.AES.encrypt(
      "sk_test_51Ls2S3SJwc7CK89toww1jI2l6TJX5MHujAhMYtnRs5WL25OqnG1EdfGQd2xLyT8D7txsUnunBsybNSj4mdT5BfHs00bjjEEqs5",
      "secret key 123"
    ).toString();

    // let Encrypt_smtp_password = CryptoJS.AES.decrypt(
    //   smtp_password,
    //   "secret key 123"
    // );
    // let Encrypt_stripe_public_key = CryptoJS.AES.decrypt(
    //   stripe_public_key,
    //   "secret key 123"
    // );
    // let Encrypt_stripe_secret_key = CryptoJS.AES.decrypt(
    //   stripe_secret_key,
    //   "secret key 123"
    // );
    let hashed_password = await bcrypt.hash("admin@123", 8);

    let data = {
      is_superadmin: true,
      status: "1",
      islogin: true,
      name: "superadmin",
      lastName: "super Admin",
      email: "superadmin@yopmail.com",
      password: hashed_password,
      role: "",
      phone_number: "8375942502",
      smtp_email: "suryarathod315@gmail.com",
      smtp_password: Encrypt_smtp_password,
      stripe_public_key: Encrypt_stripe_public_key,
      stripe_secret_key: Encrypt_stripe_secret_key,
    };

    let user = await UserModel.findOne({ is_superadmin: true });

    let SubscriptionPackage1 = {
      userId: user.id,
      name: "package1",
      monthly_price: 100.0,
      yearly_price: 1000.0,
      package_info: "sdfgafg",
      is_free: false,
      monthly_price_id: "price_1Ls3C3SJwc7CK89t2QmynomE",
      yearly_price_id: "price_1LsJBSSJwc7CK89tHkefkZmN",
      stripe_product_id: "prod_MbFhFQqA8hZLrw",
      trial_days: 0,
    };
    let SubscriptionPackage2 = {
      userId: user.id,
      name: "package2",
      monthly_price: 111.0,
      yearly_price: 1999.0,
      package_info: "sdfgafg",
      is_free: false,
      monthly_price_id: "price_1LyqVFSJwc7CK89tWLUCrCIo",
      yearly_price_id: "price_1LyqVFSJwc7CK89tdvaPkeWt",
      stripe_product_id: "prod_MiH3IuRzeVROIj",
      trial_days: 0,
    };

    let subscriptionPackageDetails = await SubscriptionPackageModel.findOne({});

    if (!user) {
      await userDao.Admincreate(data);
    }

    if (subscriptionPackageDetails === null) {
      await userDao.SubscriptionCreate(SubscriptionPackage1);
      await userDao.SubscriptionCreate(SubscriptionPackage2);
    }
  }
}

module.exports = new InitialDbAdmin();
