var express = require('express');
var crypto = require('crypto');
var fs = require('fs');
var multer = require('multer');
var axios = require('axios');
var qs = require('qs');

var User = require('../models/user');
var cors = require('./cors');
var configg = require('../config');

var router = express.Router();


const storageCover = multer.diskStorage({
  destination: (req, file, cb) => {
      console.log(file.originalname);
      cb(null, 'public/covers');
  },
  filename: (req, file, cb) => {
      console.log(file)
      const code = crypto.randomBytes(4).toString('hex');
      cb(null, `img_${code}.${file.originalname.split('.')[1]}`);
  }
});

const storageProfile = multer.diskStorage({
  destination: (req, file, cb) => {
      console.log(file.originalname);
      cb(null, 'public/profile');
  },
  filename: (req, file, cb) => {
      console.log(file)
      const code = crypto.randomBytes(4).toString('hex');
      cb(null, `img_${code}.${file.originalname.split('.')[1]}`);
  }
});

const imageFileFilter = (req, file, cb) => {
  console.log(file)
  // if(!file.originalname.match(/\.(jpg|jpeg|png|gif|bmp)$/)) {
  //     return cb(new Error('You can upload only image files!'), false);
  // }
  cb(null, true);
};

const uploadCover = multer({ storage: storageCover, fileFilter: imageFileFilter});
const uploadProfile = multer({ storage: storageProfile, fileFilter: imageFileFilter});


router.options('*', cors.corsWithOptions, (req, res) => { res.sendStatus(200); });

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/getuser/:address', cors.corsWithOptions, async (req, res, next) => {
  let userExist = await User.findOne({address: req.params.address});
  if (userExist){
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json({success: true, user: userExist});
  }
  else{
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json({success: false});    
  }
});

router.get('/exists/:address', cors.corsWithOptions, async (req, res, next) => {
  let userExist = await User.findOne({address: req.params.address});
  if (userExist){
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json({success: true, user: userExist});
  }
  else{
    let nonce = Math.floor(Math.random() * 1000000);
    userExist = await User.create({address: req.params.address, nonce: nonce});
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json({success: true, user: userExist});
  }
});

router.put('/unlink-discord', cors.corsWithOptions, async (req, res, next) => {
  let id = req.body.id;

  let usr = await User.findOneAndUpdate({_id: id}, {$set: {discord: ''}}, {new: true});
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  res.json({success: true, user: usr});
})

router.put('/discord', cors.corsWithOptions, async (req, res, next) => {
  let code = req.body.code;
  let uid = req.body.uid;

  let usr = await User.findOne({_id: uid});
  if (usr){
    
    var data = qs.stringify({
      'client_id': '993116062616920144',
      'client_secret': configg.DISCORD_CLIENT_SECRET,
      'grant_type': 'authorization_code',
      'code': code,
      'redirect_uri': 'http://localhost:3001/'
    });
    var config = {
      method: 'post',
      url: 'https://discord.com/api/oauth2/token',
      headers: { 
        'Content-Type': 'application/x-www-form-urlencoded', 
      },
      data : data
    };
    
    axios(config)
    .then(function (response) {
      console.log("access success", response.data);
      console.log(response.data.access_token);

      var config_user = {
        method: 'get',
        url: 'https://discordapp.com/api/users/@me',
        headers: { 
          'Authorization': `Bearer ${response.data.access_token}`,
        }
      };
      
      axios(config_user)
      .then(async function (response) {
        console.log("user res");
        console.log("raw", response.data);
        console.log(JSON.stringify(JSON.stringify(response.data)));
        let discusername = `${response.data.username}#${response.data.discriminator}`
        console.log(discusername);
        let upd_usr = await User.findOneAndUpdate({_id: uid}, {$set: {discord: discusername}}, {new: true});
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json({success: true, user: upd_usr});
      })
      .catch(function (error) {
        console.log(error);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json({success: false, msg: 'Invalid Access Token'});
      });
      
    })
    .catch(function (error) {
      console.log(error);
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.json({success: false, msg: 'Invalid Code'});
    });
  }
  else{
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json({success: false, msg: 'Invalid State'});
  }
});

router.put('/update-profile-img', cors.corsWithOptions, uploadProfile.single('profileImg'), async (req,res,next) => {
  var a = req.file.path.split(`public`)[1];
  let usr = await User.findOne({address: req.body.address});
  if (usr){
    if (!usr.profilepic.includes('image_1.png')){
      fs.unlink(`public/${usr.profilepic}`, (err) => {
        if (err){
            console.log("ajsd", err);
        }
      });
    }
    let updated_user = await User.findOneAndUpdate({_id: usr._id}, {$set: {profilepic: a}}, {new: true});
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json({success: true, updated_user: updated_user});  
  }
  else{
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json({success: false});  
  }
})

router.put('/update-cover', cors.corsWithOptions, uploadCover.single('coverImg'), async (req,res,next) => {
  var a = req.file.path.split(`public`)[1];
  let usr = await User.findOne({address: req.body.address});
  if (usr){
    if (!usr.cover.includes('image_1.png')){
      fs.unlink(`public/${usr.cover}`, (err) => {
        if (err){
            console.log("ajsd", err);
        }
      });
    }
    let updated_user = await User.findOneAndUpdate({_id: usr._id}, {$set: {cover: a}}, {new: true});
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json({success: true, updated_user: updated_user});  
  }
  else{
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json({success: false});  
  }
})

router.put('/update-profile-details', cors.corsWithOptions, async (req,res,next) => {
  let uid = req.body.uid;
  let username = req.body.username;
  let twitter = req.body.twitter;
  let usr = await User.findOne({_id: req.body.uid});
  if (usr){
    let updated_user = await User.findOneAndUpdate({_id: usr._id}, {$set: {username: username, twitter: twitter}}, {new: true});
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json({success: true, updated_user: updated_user});  
  }
  else{
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json({success: false});  
  }
})
module.exports = router;
