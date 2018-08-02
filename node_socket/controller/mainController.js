module.exports = (app)=>{
	
	app.get('/',(req,res)=>{
		res.render('index')
	})

	app.get('/chat',(req,res)=>{
		
		if(req.session.login)
			res.render('index',{body:'chat',login:req.session.login})
		else
			res.render('index',{body:'login'})
	})
	
	app.post('/login',(req,res)=>{
		console.log(req.body.username)
		if(req.body.username != "") {
			req.session.login = {
					username : req.body.username
			}
		}
		res.redirect('/chat')
	})
}