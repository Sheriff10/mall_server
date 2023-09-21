const express = require("express");
const { Recharge } = require("../model/recharge");
const { User } = require("../model/user");

const router = express.Router();

router.post("/", async (req, res) => {
   try {
      const { phone } = req.body;
      if (!phone) return res.status(400).send({ error: "No Phone Number" });

      const user = await User.findOne({ phone });
      if (!user) return res.status(404).send({ error: "User not found" });

      const userRechargeRecord = await Recharge.find({ phone });
      res.send(userRechargeRecord);
   } catch (error) {
      console.log(error);
      res.status(500).send({ error: "Internal Server Error" });
   }
});

module.exports = router;
