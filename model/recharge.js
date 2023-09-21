const Joi = require("joi");
const mongoose = require("mongoose");

const RechargeSchema = mongoose.Schema({
   narration: String,
   amount: String,
   sender_name: String,
   phone: Number,
   created_date: { type: String, default: Date.now() },
});

const Recharge = mongoose.model("Recharge", RechargeSchema);

const queryValidateRecharge = (data) => {
   const schema = Joi.object({
      narration: Joi.required(),
      amount: Joi.required(),
      sender_name: Joi.required(),
      phone: Joi.required(),
   });
   return schema.validate(data);
};

exports.Recharge = Recharge;
exports.queryValidateRecharge = queryValidateRecharge;
