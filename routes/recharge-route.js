const express = require("express");
const { queryValidateRecharge, Recharge } = require("../model/recharge");
const { User } = require("../model/user");

const router = express.Router();

router.post("/", async (req, res) => {
   try {
      const { error } = queryValidateRecharge(req.body);
      if (error) return res.status(400).send({ error: error.message });

      const { phone, narration, amount, sender_name } = req.body;

      const user = await User.findOne({ phone });
      if (!user) return res.status(404).send({ error: "User not Found" });

      const recharge = new Recharge({
         phone,
         narration,
         amount,
         sender_name,
      });
      await recharge.save();
      res.status(200).send({ message: "New Transaction" });
   } catch (error) {
      console.log(error);
      res.status(500).send({ error: "Internal Server Error" });
   }
});

module.exports = router;
