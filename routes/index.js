var express = require('express');
var router = express.Router();

/* GET home page. */

router.get('/', function(req, res, next){
  res.sendfile('./public/about.html', { title: 'Express',body:"" });
});

/*router.get('/friends', function(req, res, next){
  res.render('friends', { title: 'Express',body:"" });
});*/

module.exports = router;
