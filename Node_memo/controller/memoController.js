module.exports = (app,models)=>{
	
	var memoVO = models.memoVO
	var memberVO = models.memberVO
	
	app.get('/',(req,res)=>{
		memoVO.find((err,data)=>{
			res.render('index',{memoList:data})	
		})
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
		
		// 만약에 메모 본문에 enter 표시가 있으면
		req.body.memo = req.body.memo.replace(/(?:\r\n|\r|\n)/g,'<br/>')
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
							 res.redirect('/')
// res.json(data)
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
	
	app.get('/edit/:id',(req,res)=>{
		 
		if(!req.session.login) {
			res.redirect('/login')
		} else {
			// 글을 읽어와서
			memoVO.findById(req.params.id)
			.populate('writer')
			// .where('userid').eq(req.session.login.userid)
			.exec((err,data)=>{
				// res.json({data:data,se:req.session})
				if(data) {
					if(req.session.login.userid == data.writer.userid) {
						res.render('memo_form',{memo:data})	
					} else {
					res.render('clips/error',
						 {error_msg:'본인이 작성한 글만 편집 가능'})
						
					}
				} else {
					res.redirect('/')
				}
			})
		}
	})
}



