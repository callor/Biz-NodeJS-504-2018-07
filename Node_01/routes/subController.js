/**
 * http://usejsdoc.org/
 */
module.exports = (app)=>{
	
	app.get('/add',(req,res)=>{
		res.send("숫자값을 입력하세요")
	})
	
	app.get('/add/:num1',(req,res)=>{
		res.send("숫자값을 두개 입력하세요")
	})
	
	app.get('/add/:num1/:num2',(req,res)=>{
		let sum = parseInt(req.params.num1) + parseInt(req.params.num2)
		res.send("숫자2개의 합은?" + sum)
	})
	
	app.get('/home',(req,res)=>{
		res.redirect('/')
	})
}
	