const express = require("express");
const { User } = require("../model/user");
const { queryValidate } = require("../model/user");
const bcrypt = require("bcrypt");
const router = express.Router();

router.post("/:auth", async (req, res) => {
   try {
      const { error } = queryValidate(req.body);
      if (error) res.status(400).send({ error: "Invalid body Parameter" });
      else {
         const auth = req.params.auth;
         if (auth == "login") {
            const findUser = await User.find({ phone: req.body.phone });
            if (findUser.length > 0) {
               const encryptedPassword = findUser[0].password;
               const comparePassword = await bcrypt.compare(
                  req.body.password,
                  encryptedPassword
               );
               if (comparePassword) {
                  res.send({ error: "Authenticated" });
               } else {
                  res.status(400).send({ error: "Invalid Credential" });
               }
            } else {
               res.status(400).send({ error: "Invalid Credential" });
            }
         } else {
            const findExsitingUser = await User.count({
               phone: req.body.phone,
            });
            if (findExsitingUser === 1) {
               res.status(400).send({ error: "User Exists" });
            } else {
               const hashPassword = await bcrypt.hash(req.body.password, 10);
               const user = new User({
                  username: req.body.username,
                  phone: req.body.phone,
                  password: hashPassword,
               });
               await user.save();
               res.send({ message: "Registered" });
            }
         }
      }
   } catch (error) {
      res.status(500).send({ error: "Internal Server Error" });
      console.log(error);
   }
});

module.exports = router;
