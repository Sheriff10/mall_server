const express = require("express");
const Account = require("../model/account");
const router = express.Router();

// Route to update an account by its ID
router.put("/", async (req, res) => {
   const { bank_name, bank_number, account_name } = req.body;

   try {
      // Find the account document by its ID and update all fields
      const updatedAccount = await Account.findByIdAndUpdate(
         "650e1e6bb3481a4cac3b0c9a",
         { bank_name, bank_number, account_name },
         { new: true } // Return the updated document
      );

      if (!updatedAccount) {
         return res.status(404).json({ error: "Account not found" });
      }

      // Respond with the updated account document
      res.status(200).send(updatedAccount);
   } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
   }
});

module.exports = router;
