var mongoose = require('mongoose')
var Schema = mongoose.Schema

var member = new Schema({
	userid : String,
	password : String,
	username : String,
	grade : Number
})

var memo = new Schema({
	writer : {type:Schema.Types.ObjectId, ref:'member'},
	subject : String,
	memo : String,
	date : String,
	time : String
})

exports.memberVO = mongoose.model('member',member)
exports.memoVO = mongoose.model('memo',memo)