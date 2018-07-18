module.exports = function(app) {
	
	app.get('/render',function(req,res){
		res.render('home') // view 파일을 열어서 전송
	})
	
	// RestFull 요청
	app.get('/myhome',function(req,res){
		res.send("반갑습니다") // 단순 문자열 전송
	})

	app.post('/myHome',function(req,res){
		res.send('POST로 요청')
	})
	
	app.put('/myHome',function(req,res){
		res.send('PUT')
	})
	
	app.delete('/myHome',function(req,res){
		res.send('DELETE')
	})

	
	app.get('/youHome',function(req,res){
		res.write('너 누구냐') // 여러줄의 문장 보낼때
		res.write('알수가 없어')
		res.end('정말로!!')
	})
	
	
	app.get('/json',function(req,res){
		
		let json = {name:'홍길동', age:30, addr:'광주시'}
		res.json(json) // json 형태로 보낼때
	})
	
	app.get('/error',function(req,res){
		res.status(400).send('오류') // 상태코드를 먼저 보낼때
	})
}






