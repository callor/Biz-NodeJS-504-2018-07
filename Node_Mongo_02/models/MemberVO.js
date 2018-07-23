// 여기 vo는 mongoose와 연동해서 CRUD를 구현하는
// 기본 구현체

var mongoose=require('mongoose')
var Schema = mongoose.Schema

var MemberVO = new Schema( {
	
	userid : {type:String}, // ,unique:true
	password : String,
	username : String,
	age : {type:Number, min:18, max:100},
	date : {type:Date, default:Date.now},
	isAdmin : Boolean
	
})

// model에 설정하는 이름 영문자 단수형
// 실제 DB에 저장될때는 복수형으로 이름이 저장된다.
// db.members.find({})
module.exports = mongoose.model('member',MemberVO)




