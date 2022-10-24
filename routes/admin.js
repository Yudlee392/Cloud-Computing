var express = require('express');
var router = express.Router();
const selectBoxShopModule = require('../models/selectBox');
const selectShopDataModule = require('../models/selectShopData');

var session;

router.get('/', async function (req, res, next) {
   session = req.session;
   if (session.user_id) {
      let selectString = await selectBoxShopModule();
      let selectShopData = await selectShopDataModule('all');
      res.render('admin', {
         title: 'ADMIN page',
         selectBox: selectString,
         selectData: selectShopData
      })
   } else {
      res.render('login', { title: 'We are ATN Company', notice: "Please login first" })
   }
});

/* POST admin page. */
router.post('/adminFind', async function (req, res, next) {
   session = req.session;
   if (session.user_id) {
      let username = session.user_id;
      let shop_id = session.shop_id;
      let role = session.role;
      let selectString = await selectBoxShopModule();
      let selectValue = req.body.selectShop
      let selectShopData = await selectShopDataModule(selectValue)
      res.render('admin', {
         title: 'ADMIN page',
         selectBox: selectString,
         selectData: selectShopData
      })
   }
})

module.exports = router;