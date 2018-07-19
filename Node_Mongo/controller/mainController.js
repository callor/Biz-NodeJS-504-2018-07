module.exports = (app,UserVO)=>{
	
	app.get('/',(req,res)=>{

		// id == "", id 가 생성된다.
		let vo = new UserVO()
		res.render('index',{user:vo})
	
	})
	
	app.post('/insert',(req,res)=>{

		// _id 값으로 findOne을 해서
		// user를 추출(user에는 데이터 들어있다)
		UserVO.findById(req.body._id,(err,user)=>{
			if(!user) {
				console.log(user)
				let vo = new UserVO(req.body)
				console.log(vo)
				vo.save((err,data)=>{
					res.status(200)
					res.json({msg:"데이터 추가 성공",data:data})
				})
			} else {
				UserVO.update({_id:req.body._id},
				{$set:req.body},
				(err,data)=>{
					res.status(200)
					res.redirect('/listView')
				})
			}
		})
	})
	
	app.post('/update',(req,res)=>{
		UserVO.findByIdAndUpdate(req.body.id,
				{$set:req.body},(err,data)=>{
					res.status(200)
					res.redirect('/listView')
				})
		
	})
	
	app.put('/update',(req,res)=>{
		console.log('update')
	})
	
	app.get('/delete/:id',(req,res)=>{
		
		UserVO.remove({_id:req.params.id},(err)=>{
			res.status(200)
			res.redirect('/listView')
		})
	})
	
	app.delete('/delete/:id',(req,res)=>{
		console.log('update')
	})
	
	app.get('/list',(req,res)=>{
		UserVO.find((err,data)=>{
			res.json(data)
		})
	})
	
	app.get('/listview',(req,res)=>{
	
		UserVO.find((err,data)=>{
			res.render('list',{users:data})
		})
	})
	
	app.get('/update/:id',(req,res)=>{
		let id = req.params.id
		// 1개의 데이터만 추출
		UserVO.findOne({_id:id},(err,data)=>{
			res.render('index',{user:data})
		})
	})
	
}





