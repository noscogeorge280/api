const { default: mongoose } = require("mongoose");

const accountSchema = mongoose.Schema({

  fullname: { type: String, required: true },
  emailaddress: { type: String, unique: true, required: true },
  accountno: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  balance: { type: Number, default: 0 },
  date_created: { type: Date },
})

const Useraccount = mongoose.model('useraccount', accountSchema);

module.exports = Useraccount;