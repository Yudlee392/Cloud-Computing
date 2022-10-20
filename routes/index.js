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

/* insert page. */
router.post('/addProduct', function (req, res, next) {
  res.render('insertProduct');
});

/* update page. */
router.post('/updateProduct', function (req, res, next) {
  res.render('updateProduct');
});

/* delete page. */
router.post('/deleteProduct', function (req, res, next) {
  res.render('deleteProduct');
});

// stored
router.post('/stored', async function (req, res, next) {
  let id = req.body.idProduct;
  let name = req.body.nameProduct;
  let price = req.body.priceProduct;
  let quantity = req.body.quantityProduct;
  let action = req.body.action;
  let message
  let [authenticated, shop_id, role] = await authenModule(username, password)
  if (action == 'insert') {
    if (name && price && quantity) {
      insertProductModule(name, price, quantity, shop_id)
      message = 'Add successfully'
    } else {
      message = 'Add failed'
    }
  } else if (action == 'update') {
    if (id && name && price && quantity) {
      updateProductModule(id, name, price, quantity, shop_id)
      message = 'Update successfully'
    } else {
      message = 'Update failed'
    }
  } else if (action == 'delete') {
    if (id) {
      deleteProductModule(id, shop_id)
      message = 'Delete successfully'
    } else {
      message = 'Delete failed'
    }
  }
  
  if (authenticated) {
    let tableString = await tableProductModule(shop_id, role)
    res.render('users', {
      title: 'USER page',
      data: tableString,
      message: message
    })
  }
});


module.exports = router;
