const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var User = new Schema({
	username: {
		type: String,
    default: '',
  },
  address: {
    type: String,
    unique: true
  },
  profilepic: {
    type: String,
    default: '/profile/image_1.png'
  },
  cover: {
    type: String,
    default: '/covers/image_1.png'
  },
  nonce: {
    type: Number
  },
  followedBy: {
    type: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }],
    default: []
  },
  following: {
    type: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }],
    default: []
  },
  socialProfile: {
    type: [{
      media: {
        type: String
      },
      url: {
        type: String
      }
  }],
  default: []
  }
}, {
    timestamps: true
});


module.exports = mongoose.model('User', User);