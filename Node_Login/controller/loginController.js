module.exports = (app)=>{
	
	app.get('/',(req,res)=>{
		res.render('index',{
			userid:req.session.userid,
			username:req.session.username,
			grade:req.session.grade
		})
	})
	
	app.get('/login',(req,res)=>{
		res.render('login')
	})
	
	app.post('/login',(req,res)=>{
		let userid = req.body.userid
		let password = req.body.password
		
		if(userid == "aaa" && password == "1234") {

			let session = req.session
			session.userid = 'abcd' // userid
			session.username = '홍길동'
			session.grade = '관리자'
			res.redirect('/')
		
		}
	})
}