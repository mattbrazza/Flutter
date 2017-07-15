// USER MONGO DB SCHEMA AND CONTROLLER
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: { type: String, lowercase: true },
  email: { type: String, lowercase: true },
  password: String,
  dispName: String,
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
    username: userData.username || "NOTENTERED",
    email: userData.email || "NOTENTERED",
    password: userData.password || "NOTENTERED",
    dispName: userData.dispName || "NOTENTERED",
    profPicUrl: userData.picUrl || "lorempixel.com/80/80"
   };
  let user = new User(schemaData);
  user.save(callback);
};

// READ USER    -- find(), findById(), findOne()
module.exports.readUser = function(id, callback){
  User.findById(id).exec(callback);
};

// UPDATE USER  -- update(), findOneAndUpdate()
// DELETE USER  -- remove()


