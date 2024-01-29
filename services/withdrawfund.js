const TransactionHistory = require('../models/transaction_history.model');
const Useraccount = require('../models/account.model');


  exports.withdraw = async (req, res) => {
    try {
      const { amount } = req.body;
      let accountno = req.authorised;

      const user = await Useraccount.findOne({ accountno });
      if (!user) {
        return res.status(404).json({ message: 'account no not found' });
      }
  
      if (user.balance < parseFloat(amount)) {
        return res.status(400).json({ message: 'Insufficient funds' });
      }
  
      user.balance -= parseFloat(amount);
      await user.save();
  //withdraw history
  const withdrawfund = new TransactionHistory({ accountno:accountno ,fundtype: 'debit', amount: amount,transaction_date: Date.now() });
  await withdrawfund.save();
  
      res.status(200).json({ message: 'Funds withdrawn successfully', balance: user.balance });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
