const express = require("express");
const { User } = require("../model/user");

const router = express.Router();

router.get("/:phone", async (req, res) => {
   try {
      const phone = req.params.phone;

      const user = await User.findOne({ phone });
      if (!user) return res.status(404).send("user not found");
      res.send({balance: user.balance, username: user.username});
   } catch (error) {
      console.log(error);
   }
});

module.exports = router;
