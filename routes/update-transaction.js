const express = require("express");
const router = express.Router();
const { Recharge } = require("../model/recharge");

// Route to update the "pending" value for a specific recharge
router.put("/", async (req, res) => {
   const { pending, rechargeId } = req.body;

   try {
      // Find the recharge document by its ID and update the "pending" field
      const updatedRecharge = await Recharge.findByIdAndUpdate(rechargeId, {
         $set: { pending },
      });

      if (!updatedRecharge) {
         return res.status(404).json({ error: "Recharge not found" });
      }

      // Respond with the updated recharge document
      res.status(200).json(updatedRecharge);
   } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
   }
});

module.exports = router;
