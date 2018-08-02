module.exports = (io)=>{
	
	// socket이 받을 event
	// 최초에 연결되었을때 event
	io.on('connection',(socket)=>{

		console.log(socket.id)
		socket.on('user login',(name)=>{
			let msg = name + '님이 입장하였습니다'
			console.log(msg)
			io.emit('receive message',msg)
		})

		// 클라이언트에서 메시지를 보내면 받을 event 핸들러
		socket.on('send server',(name,text)=>{
			let msg = name + ' : ' + text
			console.log(msg)
			io.emit('receive message',msg)
		})
		
		// 연결이 끊기는 event 받기
		socket.on('disconnect',()=>{
			console.log('user disconnect:' + socket.id)
		})
		
	})
	
	
}