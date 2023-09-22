const mongoose = require("mongoose");

const Account_Schema = mongoose.Schema({
    //   _id: { $oid: "650e1289b16e3ff2f3ada92c" },
      bank_name: String,
      bank_number: String,
      account_name: String,
});


const Account = mongoose.model("Account", Account_Schema)

module.exports = Account