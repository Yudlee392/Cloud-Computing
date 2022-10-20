var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
   res.render('admin', {
      title: 'ADMIN page',
      data: selectString,
   })
});

module.exports = router;