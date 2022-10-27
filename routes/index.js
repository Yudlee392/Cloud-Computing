const express = require('express');
const app = require('../app');
const router = express.Router();
const authenModule = require('../models/authenticator')
const signupModule = require('../models/signup')
var path = require('path');

// Declare a variable for session
var session;
/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index');
});

router.post('/',  function (req, res, next) {
  res.render('login', { title: 'ATN SHOP', notice : ""})
})

router.get('/signup', function (req, res, next) {
  res.render('signup');
});

router.post('/signup', function (req, res, next) {
  let name = req.body.name
  let shop = req.body.shop
  let password = req.body.password
  if (name && shop && password) {
    signupModule(name, shop, password)
    res.render('login', { title: 'ATN SHOP', notice: "Sign up successfully. Please login again" })
  }
  res.render('login', { title: 'ATN SHOP', notice: "Sign up failed" })
});

/* POST login page. */
router.post('/login', async function (req, res, next) {
  const username = req.body.username
  const password = req.body.password
  session = req.session
  let [authenticated, shop_id, role] = await authenModule(username, password)
  
  if (authenticated) {
    session.user_id = username;
    session.shop_id = shop_id;
    session.role = role;
    if (role == 'shop') {
      res.redirect('/users')
    }
    else {
      res.redirect('/admin')
    }
  }
  else {
    res.render('login', { title: 'ATN SHOP', notice: "Wrong username or password"})
  }
});

router.get('/logout', function (req, res, next) {
  req.session.destroy((err) => {
    req.session = null
    res.redirect('/')
  })
})




module.exports = router;
