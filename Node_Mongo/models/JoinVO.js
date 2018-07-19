var mongoose = require('mongoose')
var schema = mongoose.Schema

var personSchema = schema({
	name : String,
	addr : String,
	tel : String
})

var gradeSchema = schema({
	person : { type:Schema.Types.ObjectId, ref:'Person'},
	korea : Number,
	eng : Number,
	student :[{type:Schema.Types.ObjectId, ref:'Person'}]
})

var Person  = mongoose.model('Person',personSchema)
var Grade = mongoose.model('Grade',gradeSchema)


