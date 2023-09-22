const express = require("express");
const { Banks } = require("../model/bank");
const { queryValidateBank } = require("../model/bank");
const { User } = require("../model/user");
const bcrypt = require("bcrypt");

const router = express.Router();

router.post("/", async (req, res) => {
   try {
      const { error } = queryValidateBank(req.body);
      if (error) res.status(400).send({ error: error.message });
      else {
         const isBankRecorded = await Banks.count({ phone: req.body.phone });
         const user = await User.findOne({ phone: req.body.phone });
         if (!user) return res.status(404).send({ error: "no user" });
         const isPasswordVerified = await bcrypt.compare(
            req.body.password,
            user.password
         );
         if (!isPasswordVerified)
            return res.status(400).send({ error: "bad password" });
         if (isBankRecorded === 1) {
            const isUpdated = await Banks.updateOne(
               { phone: req.body.phone },
               {
                  $set: {
                     bank_name: req.body.bank_name,
                     bank_account: req.body.bank_account,
                     account_name: req.body.account_name,
                     phone: req.body.phone,
                  },
               }
            );
            if (isUpdated.acknowledged) res.send("Updated Successfully");
            else {
               res.status(500).send("Unknown Error Occured");
            }
         } else {
            const bank = new Banks({
               bank_name: req.body.bank_name,
               bank_account: req.body.bank_account,
               account_name: req.body.account_name,
               phone: req.body.phone,
            });
            await bank.save();
            res.send("Inserted Successfully");
         }
      }
   } catch (error) {
      console.log(error);
   }
});

module.exports = router;
