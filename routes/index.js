const express = require('express');
const app = require('../app');
const router = express.Router();
const authenModule = require('../models/authenticator')
const tableProductModule = require('../models/tableProduct')
const selectBoxShopModule = require('../models/selectBox');
const selectShopDataModule = require('../models/selectShopData');
const insertProductModule = require('../models/productAdd');
const updateProductModule = require('../models/productUpdate');
const deleteProductModule = require('../models/productDelete');
const formProductModule = require('../models/productForm');
var path = require('path');



/* GET home page. */
// router.get('/', function (req, res, next) {
//   res.render('../views/index.ejs', { title: 'ATN SHOP' });
// });

/* GET login page. */
router.get('/', function (req, res, next) {
  res.render('login', { title: 'Login page', notice: "" })
})
router.post('/',  function (req, res, next) {
  res.render('login', { title: 'Login page', notice : ""})
})

var username;
var password;

/* POST login page. */
router.post('/login', async function (req, res, next) {
  username = req.body.username
  password =req.body.password
  let [authenticated, shop_id, role] = await authenModule(username, password)
  
  if (authenticated) {
    if (role == 'shop') {
      let tableString = await tableProductModule(shop_id, role)
      res.render('users', {
        title: 'USER page',
        data: tableString,
        message: ''
      })
    }
    else {
      let selectString = await selectBoxShopModule();
      let selectShopData = await selectShopDataModule('all');
      res.render('admin', {
        title: 'ADMIN page',
        selectBox: selectString,
        selectData: selectShopData
      })
      
    }
  }
  else {
    res.render('login', { title: 'Login page', notice: "Wrong username or password"})
  }
});

/* POST admin page. */
router.post('/adminFind', async function (req, res, next) {
  let selectString = await selectBoxShopModule();
  let selectValue = req.body.selectShop
  let selectShopData = await selectShopDataModule(selectValue)
  res.render('admin', {
    title: 'ADMIN page',
    selectBox: selectString,
    selectData: selectShopData
  })
})


// stored
router.post('/stored', async function (req, res, next) {
  let deleteProductId = req.body.delete
  let updateProduct = req.body.update
  let id = req.body.id;
  let name = req.body.name;
  let price = req.body.price;
  let quantity = req.body.quantity;
  let updated = req.body.updated;
  let insertName = req.body.insert_name;
  let insertPrice = req.body.insert_price;
  let insertQuantity = req.body.insert_quantity;
  let insertAction = req.body.insert;
  let message =''
  let [authenticated, shop_id, role] = await authenModule(username, password)
  if (deleteProductId) {
    deleteProductModule(deleteProductId, shop_id)
    let tableString = await tableProductModule(shop_id, role)
    res.render('users', {
      title: 'USER page',
      data: tableString,
      message: message
    })
  }
  
  if (updateProduct) {
    formGroup = await formProductModule(updateProduct)
    res.render('updateProduct', {
      formGroup: formGroup,
      idUpdate: updateProduct,
    });
  }
  if (updated) {
    updateProductModule(id,name,price, quantity, shop_id)
    let tableString = await tableProductModule(shop_id, role)
    res.render('users', {
      title: 'USER page',
      data: tableString,
      message: message
    })
  }
  if (insertAction) {
    insertProductModule(insertName, insertPrice, insertQuantity, shop_id)
    let tableString = await tableProductModule(shop_id, role)
    res.render('users', {
      title: 'USER page',
      data: tableString,
      message: message
    })
  }
});




module.exports = router;
