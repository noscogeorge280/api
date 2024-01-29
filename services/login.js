const Useraccount = require('../models/account.model');
const jwt = require('jsonwebtoken');


exports.login = async (req, res) => {
    try {
        const { account, password } = req.body;

        const senderUser = await Useraccount.findOne({ accountno: account });
console.log("pro",  process.env.JWT_KEY)
        if (!senderUser) {
            return res.status(404).json({ message: 'User or account no not found' });
        }
        token = await jwt.sign(account, process.env.JWT_KEY, {
            
        })


        res.status(200).json({ message: 'login successful', token: token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

exports.auth = async (req, res, next) => {
    console.log("auth ::", req.get("authorization"))
    if (!req.get("authorization")) {
        return res.status(401).json({ message: 'Unauthorized access' });

    }
    let token = jwt.verify(req.get("authorization").slice(7), process.env.JWT_KEY);

    let user = token;
    if (!user) {
        return res.status(401).json({ message: 'Unauthorized access' });

    }
    req.authorised = user;
    next()

}