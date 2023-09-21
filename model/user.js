const Joi = require("joi");
const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
   username: String,
   phone: String,
   password: String,
   balance: { type: Number, default: 0 },
   created_date: { type: String, default: Date.now() },
});

const User = mongoose.model("Users", UserSchema);

const queryValidate = (data) => {
   const schema = Joi.object({
      username: Joi.required(),
      phone: Joi.required(),
      password: Joi.required(),
   });
   return schema.validate(data);
};

exports.User = User;
exports.queryValidate = queryValidate;
