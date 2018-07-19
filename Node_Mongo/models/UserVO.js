/**
UserVO 
  nodejs + mongoose 를 연동하는 모듈
*/
// mongoose 모듈을 import
var mongoose = require('mongoose')

var UserSchema = mongoose.Schema({

	username : String,
	password : String,
	tel : String,
	age : Number

})

module.exports 
= mongoose.model("User",UserSchema)
