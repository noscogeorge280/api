
const Useraccount = require('../models/account.model');
const bcrypt = require('bcrypt');

exports.openaccount =async (req, res) => {
    try {
      
    
      const { accountno,fullname,emailaddress, password } = req.body;
  
      // Check if the account no already exists
      const existingUser = await Useraccount.findOne({ accountno });
      if (existingUser) {
        return res.status(400).json({ message: 'account no already exists' });
      }
  
      // Hash the password
      let saltPassword = await bcrypt.genSaltSync(10);
      hashedPassword = await bcrypt.hashSync(password, saltPassword);
 
  
      // Create a new user
      const newUser = new Useraccount({ accountno:accountno,fullname :fullname,emailaddress, password: hashedPassword,date_created: Date.now() });
      await newUser.save();
  
      res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }