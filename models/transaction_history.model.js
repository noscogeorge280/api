const { default: mongoose } = require("mongoose");

const transactionSchema = mongoose.Schema({

  accountno: { type: String, required: true },
  fundtype: { type: String, required: true },
  amount: { type: Number,  required: true},
  transaction_date: { type: Date},
})

const TransactionHistory = mongoose.model('transactionhistory', transactionSchema);

module.exports = TransactionHistory;