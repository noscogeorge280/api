var express = require('express');
var router = express.Router();
var openaccount = require('../services/createaccount');
var fundaccount = require('../services/fundaccount');
var trans = require('../services/transferfunds');
var withdraw = require('../services/withdrawfund');
const { auth, login } = require('../services/login');


router.post('/register', openaccount.openaccount);

router.post('/fund', auth,   fundaccount.fundaccount);
 router.post('/transfer', auth,trans.transfer );
 router.post('/withdraw', auth, withdraw.withdraw );
 router.post('/login',login );

module.exports = router;
