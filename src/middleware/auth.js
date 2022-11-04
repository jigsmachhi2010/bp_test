const jwt = require("jsonwebtoken");
const user = require("../modal/user");
const messages = require("../helper/messages");
const response_handler = require("../handler/responsehandler");
const error_codes = require("../helper/error_codes");

const auth = async (req, res, next) => {
  try {
    let usertoken;
    const token = req.header("Authorization").replace("Bearer ", "");
    if (!token) {
      return response_handler.errorResponse(
        res,
        error_codes.UNAUTHORIZED_ACCESS,
        messages.unauthorized_access
      );
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    jwt.verify(token, process.env.JWT_SECRET, async function (error, data) {
      if (error) {
        return response_handler.errorResponse(
          res,
          error_codes.UNAUTHORIZED_ACCESS,
          messages.unauthorized_access
        );
      } else {
        usertoken = await user.findOne({ _id: decoded.id });
        req.user = usertoken;
        next();
      }
    });
  } catch (e) {
    console.log(e);
    res.status(401).send({ error: "Please authenticate" });
  }
};

module.exports = auth;
