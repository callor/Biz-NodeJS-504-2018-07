$(function(){

	var socket = io()
	$('#chat').on('submit',function(e){
		// alert('enter')
		socket.emit('send server', $('#name').val(), $('#message').val())
		$('#message').val('')
		$('#message').focus()
		
		// submit 이벤트를 중단
		e.preventDefault()
		e.stopImmediatePropagation()
		
	})
	
	socket.on('receive message',function(msg){
		$('#chatWindow').append(msg + '\n')
		$('#chatWindow').scrollTop($('#chatWindow')[0].scrollHeight)
	})
	
	if($('#name').val() != "" ) {
		socket.emit('user login',$('#name').val())
	}
	
	
})
