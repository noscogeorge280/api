const TransactionHistory = require('../models/transaction_history.model');
const Useraccount = require('../models/account.model');



exports.fundaccount =async (req, res) => {
    let myaccount = req.authorised;
    try {
      const { accountno, amount } = req.body;
  console.log("myaccount :: ",myaccount);
      const user = await Useraccount.findOne({ accountno: accountno });
      if (!user) {
        return res.status(404).json({ message: 'account no not found' });
      }
      console.log("amount",amount);
      user.balance += Number(amount);
      await user.save();
        // Keep fund history a new user
        const newfund = new TransactionHistory({ accountno:accountno ,fundtype: 'credit', amount: amount ,transaction_date: Date.now()});
        await newfund.save();
  
      res.status(200).json({ message: 'Funds added successfully', balance: user.balance });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }