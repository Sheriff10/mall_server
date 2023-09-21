const express = require("express");
const { User } = require("../model/user");

const router = express.Router();

router.post("/", async (req, res) => {
   try {
      const { phone, balance } = req.body;
      if (!phone || !balance) return res.status(400).send({error: "Phone or balance not sent"});

      const user = await User.findOne({ phone });
      if (!user) return res.status(404).send({error: "User not found"});

      await User.findByIdAndUpdate(user._id, { $set: { balance } });
      res.status(200).send({ message: "Balance Updated" });
   } catch (error) {
      console.log(error);
      res.status(500).send({error: "Internal Server Error"})
   }
});

module.exports = router;
