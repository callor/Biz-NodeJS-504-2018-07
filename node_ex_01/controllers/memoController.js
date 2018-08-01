module.exports = (app,models)=>{
	
	app.get('/',(req,res)=>{
		res.render('index',{msg:'반갑습니다'})
	})
	
	app.get('/date',(req,res)=>{
	
		require('date-utils')
		let today = new Date() // 내장함수
		
		let times = {
			time : today,
			strDate : today.toFormat('YYYY-MM-DD'),
			strTime : today.toFormat('HH:MI:SS'), // 12시간체계
			str24Time : today.toFormat('HH24:MI:SS'), // 24시간 체계
			strDateTime : today.toFormat('YYYY-MM-DD HH24:MI:SS'),
			
		}
		
		res.json(times)
		
		
	})
	
	
	
	app.get('/page',(req,res)=>{
		
		let pages = []
		for(i = 1; i < 10 ; i++ ) {
			pages.push(i)
		}
		res.render('page',{pages:pages})
	})
	
	app.post('/pinsert',(req,res)=>{
		let no = req.body.index
		res.render('clip',{no:no})
	})
	
	app.post('/input',(req,res)=>{
	
		let aa = req.body.a1
		let ch = req.body.ch
		
		let index = 0
		// console.log('check 개수'+ch.length)
		
		let ret = []
		if(Array.isArray(ch)) {
			ch.forEach((c,index)=>{
				console.log(c)
				
				index = parseInt(c)
				ret.push({value:aa[index]})
				console.log( index + ' : ' + aa[index] )
				
			})
		} else {
			ret = {value:aa[parseInt(ch)]}
		}
		res.json(ret)
		
//		let html = "<table><tr><td>대한민국</td></tr></table>"
//		res.send(html)
		 // res.redirect('/list')
	})
	
	app.get('/list',(req,res)=>{
		
		let list = [{
						name:'홍길동',
						phone:'111',
						addr:'서울시'
					},
					{
						name:'이몽룡',
						phone:'222',
						addr:'남원시'
					},
					{
						name:'성춘향',
						phone:'333',
						addr:'익산시'
					}
					]
				
			res.render('index',{list:[]})
		
		
	})
	
}