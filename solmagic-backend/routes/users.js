var express = require('express');
var crypto = require('crypto');
var fs = require('fs');
var multer = require('multer');

var User = require('../models/user');
var cors = require('./cors');

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

module.exports = router;
