const express = require("express");
const Account = require("../model/account");

const router = express.Router();

router.get("/", async (req, res) => {
   try {
      const account = await Account.findById("650e1e6bb3481a4cac3b0c9a");
      res.send(account);
   } catch (error) {
      console.log(err);
      res.status(500).send("Internal server error");
   }
});

module.exports = router;
