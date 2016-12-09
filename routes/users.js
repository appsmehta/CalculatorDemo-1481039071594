var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});


exports.authenticate = function (req,res)
{
	console.log("req.body");

	res.redirect('/sidebar.html');
}

module.exports = router;
