var express = require('express');
var router = express.Router();
const tableProductModule = require('../models/tableProduct')
const insertProductModule = require('../models/productAdd');
const updateProductModule = require('../models/productUpdate');
const deleteProductModule = require('../models/productDelete');
const formProductModule = require('../models/productForm');
const TimeOut = require('../models/timeOut');
const userDataModule = require('../models/userData');

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
    res.render('login', { title: 'We are ATN Company', notice: "Please login first" })
  }
});
// router.get('/delete', async function (req, res, next) {
//   session = req.session;
//   if (session.user_id) {
//     let username = session.user_id;
//     let shop_id = session.shop_id;
//     let role = session.role;
//     let tableString = await tableProductModule(shop_id, role)
//     res.render('users', {
//       title: 'USER page',
//       data: tableString,
//       message: ''
//     })
//   } else {
//     res.render('login', { title: 'Login page', notice: "Please login first" })
//   }
// });

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
    insertProductModule(insertName, insertPrice, insertQuantity, shop_id)
    let tableString = await tableProductModule(shop_id, role)
    res.render('users', {
      title: 'USER page',
      data: tableString,
      user_data: userData,
      message: 'Insert successfully'
    })
  } else if (deleteId) {
    deleteProductModule(deleteId, shop_id)
    let tableString = await tableProductModule(shop_id, role)
    res.render('users', {
      title: 'USER page',
      data: tableString,
      user_data: userData,
      message: 'Deleted successfully'
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
    updateProductModule(id, name, price, quantity, shop_id)
    let tableString = await tableProductModule(shop_id, role)
    res.render('users', {
      title: 'USER page',
      data: tableString,
      user_data: userData,
      message: 'Updated successfully'
    })
  }
})






module.exports = router;
