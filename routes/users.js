var express = require('express');
var router = express.Router();
const tableProductModule = require('../models/tableProduct')
const insertProductModule = require('../models/productAdd');
const updateProductModule = require('../models/productUpdate');
const deleteProductModule = require('../models/productDelete');
const formProductModule = require('../models/productForm');
const TimeOut = require('../models/timeOut');
const userDataModule = require('../models/userData');
const e = require('express');

var session;

/* GET users listing. */
router.get('/', async function (req, res, next) {
  session = req.session;
  if (session.user_id) {
    let username = session.user_id;
    let shop_id = session.shop_id;
    let role = session.role;
    let userData = await userDataModule(username, shop_id)
    let tableString = await tableProductModule(shop_id, role)
    res.render('users', {
      title: 'USER page',
      data: tableString,
      user_data: userData,
      message: ''
    })
  } else {
    res.render('login', { title: 'ATN SHOP', notice: "Please login first" })
  }
});

router.post('/', async function (req, res, next) {
  session = req.session;
  let shop_id = session.shop_id;
  let role = session.role;
  let username = session.user_id;
  let userData = await userDataModule(username, shop_id)
  let insertAction = req.body.insert
  let deleteId = req.body.delete
  let updateId = req.body.update
  let updated = req.body.updated;
  if (insertAction) {
    let insertName = req.body.insert_name;
    let insertPrice = req.body.insert_price;
    let insertQuantity = req.body.insert_quantity;
    let insertMessage = await insertProductModule(insertName, insertPrice, insertQuantity, shop_id)
    let tableString = await tableProductModule(shop_id, role)
    res.render('users', {
      title: 'USER page',
      data: tableString,
      user_data: userData,
      message: insertMessage
    })
  } else if (deleteId) {
    let deleteMessage= await deleteProductModule(deleteId, shop_id)
    let tableString = await tableProductModule(shop_id, role)
    res.render('users', {
      title: 'USER page',
      data: tableString,
      user_data: userData,
      message: deleteMessage
    })
  }
  else if (updateId) {
    formGroup = await formProductModule(updateId)
    res.render('updateProduct', {
      formGroup: formGroup,
      idUpdate: updateId,
    });
  } else if (updated) {
    let id = req.body.id;
    let name = req.body.name;
    let price = req.body.price;
    let quantity = req.body.quantity;
    let updateMessage = await updateProductModule(id, name, price, quantity, shop_id)
    let tableString = await tableProductModule(shop_id, role)
    res.render('users', {
      title: 'USER page',
      data: tableString,
      user_data: userData,
      message: updateMessage
    })
  }
})






module.exports = router;
