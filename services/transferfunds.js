const TransactionHistory = require('../models/transaction_history.model');
const Useraccount = require('../models/account.model');


exports.transfer =async (req, res) => {
    try {
      const { sender, receiver, amount } = req.body;
  
      const senderUser = await Useraccount.findOne({ accountno: sender });
      const receiverUser = await Useraccount.findOne({ accountno: receiver });
  
      if (!senderUser || !receiverUser) {
        return res.status(404).json({ message: 'Sender or receiver not found' });
      }
  
      if (senderUser.balance < parseFloat(amount)) {
        return res.status(400).json({ message: 'Insufficient funds' });
      }
  
      senderUser.balance -= parseFloat(amount);
      receiverUser.balance += parseFloat(amount);
  
      //sender history
      const senderfund = new TransactionHistory({ accountno:senderUser.accountno ,fundtype: 'debit', amount: amount,transaction_date: Date.now()});
      await senderfund.save();
  
         //receiver history
      const receiverfund = new TransactionHistory({accountno:receiverUser.accountno ,fundtype: 'credit', amount: amount ,transaction_date: Date.now()});
      await receiverfund.save();
  
      await senderUser.save();
      await receiverUser.save();
  
      res.status(200).json({ message: 'Funds transferred successfully', senderBalance: senderUser.balance });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }