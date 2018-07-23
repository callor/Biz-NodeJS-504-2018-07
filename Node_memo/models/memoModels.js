var mongoose = require('mongoose')
var Schema = mongoose.Schema


var memoVO = new Schema({
	writer : {type:Schema.Types.ObjectId, ref:'member'},
	subject : String,
	memo : String
})

var memberVO = new Schema({
	
	userid : String,
	password : String,
	username : String,
	age : Number
	
})

exports.memberVO = mongoose.model('member',memberVO)
exports.memoVO = mongoose.model('memo',memoVO)

