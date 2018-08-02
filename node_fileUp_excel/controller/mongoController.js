// multer 초기화 작업
var multer = require('multer')
var path = require('path')

var mongoXlsx = require('mongo-xlsx');
var mongojs = require('mongojs');
var db = mongojs('master', ['addr'])

// 업로드한 파일을 저장할 곳
var filePath = path.join(__dirname, '../public/excel')

// multer가 파일을 받아서 저장할 환경setting
var saveStorage = multer.diskStorage({
	
	// 폴더설정
	destination : (req,file,callback)=>{
		callback(null,filePath)
	},
	// 파일이름 변경
	filename : (req,file,callback)=>{
		callback(null,Date.now() + '_' + file.originalname)
	}
})

// 업로드 함수 생성
var upload = multer({storage:saveStorage}).single('excel')

module.exports = (app)=>{
	var parseExcel = require('xlsx')
	
	app.post('/update',(req,res)=>{
		upload(req,res,(err)=>{

			if(req.file != undefined) {

				let fileName = path.join(filePath,req.file.filename)
				var model = null;
				mongoXlsx.xlsx2MongoData(fileName, model, function(err, data) {
					console.log(data);
					mongoXlsx.buildDynamicModel(data)
					db.configurations.insert(data,(err, doc)=>{
						res.json(doc)	
					}) 
					
				});
			}
		})

	})
	
	
	app.post('/upload',(req,res)=>{
		upload(req,res,(err)=>{

			if(req.file != undefined) {

				let fileName = path.join(filePath,req.file.filename)
				let workbook = parseExcel.readFile(fileName)
				
				let firstWorkSheetName = workbook.SheetNames[0]
				
				let workSheet = workbook.Sheets[firstWorkSheetName]
				res.json(workSheet)
				
			}
		})
	})
	
}



