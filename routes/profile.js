var express = require("express");
const router = express();
const verify = require('../src/verification/verifyToken')

router.post("/test", verify, (req, res, next) => {
 res.send('ohoy :)')
  
});

module.exports = router;
