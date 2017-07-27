// USER MONGO DB SCHEMA AND CONTROLLER
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: { type: String, lowercase: true },
  email: { type: String, lowercase: true },
  password: String,
  dispName: { type: String, default: "" },
  tagline: { type: String, default: "" },
  following: {
    count: {type: Number, default: 0, min: 0},
    users: [{type: Schema.ObjectId, ref: 'User'}]
  },
  followers: {
    count: {type: Number, default: 0, min: 0},
    users: [{type: Schema.ObjectId, ref: 'User'}]
  },
  profPicUrl: String,
  joinDate: { type: Date, default: Date.now }
}, { runSettersOnQuery: true });

const User = mongoose.model('User', UserSchema);

// CREATE USER  -- save()
module.exports.createUser = function(userData, callback){
  let schemaData = {
    username: userData.username || "NOT_ENTERED",
    email: userData.email || "NOT_ENTERED",
    password: userData.password || "NOT_ENTERED",
    profPicUrl: userData.picUrl || "http://lorempixel.com/80/80"
  };
  let user = new User(schemaData);
  user.save(callback);
};

// READ USER    -- find(), findById(), findOne()
module.exports.readUserById = function(id, callback){
  User.findById(id).exec(callback);
};
module.exports.readUserByName = function(username, callback){
  User.findOne({'username': username}).exec(callback); //.select('_id username')
};

// UPDATE USER  -- update(), findOneAndUpdate()
module.exports.updateUser = function(userData, callback){
};

// DELETE USER  -- remove()


