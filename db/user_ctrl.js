/* USER - MONGO DB SCHEMA and CONTROLLER */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: { type: String, lowercase: true },
  email: { type: String, lowercase: true },
  password: String,
  dispName: { type: String, default: "" },
  tagline: { type: String, default: "" },
  _following: [{type: Schema.ObjectId, ref: 'User'}],
  _followers: [{type: Schema.ObjectId, ref: 'User'}]
},
  profPicUrl: String,
  joinDate: { type: Date, default: Date.now }
}, { runSettersOnQuery: true });

const User = mongoose.model('User', UserSchema);

/**************************************************
***************************************************/

/* CREATE USER -- createUser */
module.exports.createUser = function(userData, callback){
  let schemaData = {
    profPicUrl: userData.picUrl || "http://lorempixel.com/80/80"
  };
  let user = new User(schemaData);
  user.save(callback);
};

/* READ USER -- readUserByName, readUserById(Depr) */
module.exports.readUserById = function(id, callback){};
module.exports.readUserByName = function(loginReq, callback){
  User.findOne({'username': loginReq.username})
    .where('password').equals(loginReq.password)
    .select('_id username dispName email profPicUrl followers following joinDate')
    .populate('_following', 'username dispName profPicUrl')
    .populate('_followers', 'username dispName profPicUrl')
    .exec(callback); //.select('_id username')
};

/* UPDATE USER -- updateUser, followUser, unfollowUser */
module.exports.updateUser = function(userData, callback){
  let query = { _id: userData.id };
  let updateSet = { // TODO: Prevent user from nulling prop
    username: userData.username,
    email: userData.email,
    dispName: userData.dispName,
    tagline: userData.tagline
  };
  User.findOneAndUpdate(query,{$set: updateSet,},{new: true})
    .populate('_following', 'username dispName profPicUrl')
    .populate('_followers', 'username dispName profPicUrl')
    .exec(callback);
};

module.exports.followUser = function(request, callback){
  let query = { _id: request.user_id };
  let updateSet = { 'following.users': request.profile_id };

  User.findOneAndUpdate(query,{$push: updateSet},{new: true})
    .populate('_following', 'username dispName profPicUrl')
    .populate('_followers', 'username dispName profPicUrl')
    .exec(callback);
};
module.exports.unfollowUser = function(request, callback){};

/* DELETE USER */

