var express = require('express');
var router = express.Router();
const tableProductModule = require('../models/tableProduct')
const insertProductModule = require('../models/productAdd');
const updateProductModule = require('../models/productUpdate');
const deleteProductModule = require('../models/productDelete');
const formProductModule = require('../models/productForm');
const TimeOut = require('../models/timeOut');

var session;

/* GET users listing. */
router.get('/', async function (req, res, next) {
  session = req.session;
  if (session.user_id) {
    let username = session.user_id;
    let shop_id = session.shop_id;
    let role = session.role;
    let tableString = await tableProductModule(shop_id, role)
    res.render('users', {
      title: 'USER page',
      data: tableString,
      message: ''
    })
  } else {
    res.render('login', { title: 'Login page', notice: "Please login first" })
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


router.post('/insert', async function (req, res, next) {
  session = req.session;
  let shop_id = session.shop_id;
  let role = session.role;
  let message = ''
  let insertName = req.body.insert_name;
  let insertPrice = req.body.insert_price;
  let insertQuantity = req.body.insert_quantity;
  insertProductModule(insertName, insertPrice, insertQuantity, shop_id)
  TimeOut(1000)
  let tableString = await tableProductModule(shop_id, role)
  TimeOut(2000)
  res.render('users', {
    title: 'USER page',
    data: tableString,
    message: 'Insert successfully'
  })
})

router.post('/delete', async function (req, res, next) { 
  let deleteProductId = req.body.delete
  let shop_id = session.shop_id;
  let role = session.role;
  deleteProductModule(deleteProductId, shop_id)
  let tableString = await tableProductModule(shop_id, role)
  res.render('users', {
    title: 'USER page',
    data: tableString,
    message: 'Deleted successfully'
  })
})

router.post('/update', async function (req, res, next) {
  session = req.session;
  let shop_id = session.shop_id;
  let role = session.role;
  let updateProduct = req.body.update
  let updated = req.body.updated;
  let tableString
  if (updateProduct) {
    formGroup = await formProductModule(updateProduct)
    res.render('updateProduct', {
      formGroup: formGroup,
      idUpdate: updateProduct,
    });
  }
  if (updated) {
    let id = req.body.id;
    let name = req.body.name;
    let price = req.body.price;
    let quantity = req.body.quantity;
    updateProductModule(id, name, price, quantity, shop_id)
    tableString = await tableProductModule(shop_id, role)
    res.render('users', {
      title: 'USER page',
      data: tableString,
      message: 'Updated successfully'
    })
  }
})





module.exports = router;
