/**
 * http://usejsdoc.org/
 */
module.exports = (app,models)=>{
	
	var mVO = models.memberVO
	
	app.get('/join',(req,res)=>{
		res.render('join_form')
	})
	
	app.post('/join',(req,res)=>{
		
		let vo = new mVO(req.body)
		vo.save((err,data)=>{
			// res.redirect('/')
			res.json(data)
		})
	})
	
	app.get('/login',(req,res)=>{
		res.render('login_form')
	})
	
	app.post('/login',(req,res)=>{
		
		mVO.findOne()
		.where('userid').eq(req.body.userid)
		.where('password').eq(req.body.password)
		.exec((err,result)=>{
			if(result) {
				req.session.login = result
				res.redirect('/')
			} else {
				res.send('로그인 오류')
			}
			
		})

	})
	
	
}