module.exports = (app,models)=>{
	
	var memoVO = models.memoVO
	var memberVO = models.memberVO
	
	app.get('/',(req,res)=>{
		res.render('index')
	})
	
	app.get('/memo',(req,res)=>{
		// 세션 값이 없으면
		if(!req.session.login) {
			res.redirect('/login')
		} else {
			
			let vo = new memoVO()
			res.render('memo_form',{memo:vo, login:req.session.login})	
		}
	})
	
	app.post('/memo',(req,res)=>{
		if(!req.session.login) res.redirect('/login')
		
		memoVO.findById(req.body.id,
				(err,data)=>{
					if(data){
						// update 처리
						memoVO.update({_id:req.body.id},
								{$set:req.body},(err,result)=>{
									res.redirect('/')
								})
					} else {
						let vo = new memoVO(req.body)
						vo.save((err,data)=>{
							// res.redirect('/')
							res.json(data)
						})
					}
				}
		)
	})
	
	app.get('/memolist',(req,res)=>{
	
		memoVO.find()
		.populate('writer')
		.exec((err,data)=>{
			res.json(data)
		})
		
	})
	
	
}