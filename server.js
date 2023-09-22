const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();

const auth = require("./routes/auth");
const bank = require("./routes/bank-route");
const password = require("./routes/update-password");
const balance = require("./routes/add-balance");
const recharge = require("./routes/recharge-route");
const rechargeHistory = require("./routes/recharge-history");
const rechargeRoute = require("./routes/get-recharges");
const update = require("./routes/update-transaction");
const updateAcct = require("./routes/update-account");
const getAcct = require("./routes/get-account");
const getBal = require("./routes/get-balance");

mongoose
   .connect(
      "mongodb+srv://ibrahimsheriff999:RL4zbmMRrLf4StbK@cluster0.ihfo80m.mongodb.net/?retryWrites=true&w=majority"
   )
   .then(() => {
      console.log("Database Connected Succesfully");
   })
   .catch((err) => console.log(err));
app.use(express.json());
app.use(cors());

app.use("/auth", auth);
app.use("/bank", bank);
app.use("/update-password", password);
app.use("/add-balance", balance);
app.use("/recharge", recharge);
app.use("/recharge-history", rechargeHistory);
app.use("/get-recharges", rechargeRoute);
app.use("/update-transaction", update);
app.use("/update-account", updateAcct);
app.use("/get-account", getAcct);
app.use("/get-balance", getBal);

app.use((req, res) => {
   res.status(404).send("Route Not Found");
});
app.listen(process.env.PORT || 5000, () => {
   console.log("listening on port 5000...");
});

// However some functions are functional. Recharge record, bind bank card, change password, modify withdrawal password, balance top
// On the admin panel I should be able top up users balance using their phone number
