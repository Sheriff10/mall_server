const express = require("express");
const bcrypt = require("bcrypt");
const Joi = require("joi");
const { User } = require("../model/user");

const router = express.Router();

// Define a Joi schema for request body validation
const schema = Joi.object({
   phone: Joi.string().required(),
   old_password: Joi.string().required(),
   new_password: Joi.string().required(),
});

// POST route for updating a user's password
router.post("/", async (req, res) => {
   try {
      // Validate the request body
      const { error } = schema.validate(req.body);

      if (error) {
         return res.status(400).json({ error: "Invalid request body" });
      }

      // Find the user by phone number
      const user = await User.findOne({ phone: req.body.phone });

      if (!user) {
         return res.status(404).json({ error: "User not found" });
      }

      // Compare the old password with the stored hashed password
      const isPasswordValid = await bcrypt.compare(
         req.body.old_password,
         user.password
      );

      if (!isPasswordValid) {
         return res.status(400).json({ error: "Invalid old password" });
      }

      // Hash and update the new password
      const newPasswordHash = await bcrypt.hash(req.body.new_password, 10);

      await User.findByIdAndUpdate(user._id, { password: newPasswordHash });

      res.status(200).json({ message: "Password updated successfully" });
   } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
   }
});

module.exports = router;
