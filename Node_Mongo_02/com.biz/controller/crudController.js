

module.exports = (app,MVO)=>{
	
	app.get('/',(req,res)=>{
		res.render('index',
	
				{name:'<font color=red>홍佶동</font>',
				message:'<a href=/home>홈으로</a>'})

	})
	
	app.get('/insert',(req,res)=>{
		
		let vo = new MVO()
		res.render('member_join',{mvo:vo})
	
	})
	
	app.post('/insert',(req,res)=>{
		
		// new 실행하면 _id 값이 null 이고
		let vo = new MVO(req.body)
		vo.save((err,data)=>{ // 그때 _id이 생성
			res.json(
				{
					message:'데이터추가 완료!!',
					data
				})
		})
		
	})
	
	app.get('/getJsonAll',(req,res)=>{
	
		MVO.find((err,data)=>{
			res.json(data)
		})
	})
	
	app.get('/getListView',(req,res)=>{
		MVO.find((err,data)=>{
			res.render('list',{list:data})
		})
	})
	
	app.get('/update/:id',(req,res)=>{
		
		MVO.findOne({_id:req.params.id},(err,data)=>{
			res.render('member_join',{mvo:data})
		})
	})
}



