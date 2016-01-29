var login = require('facebook-chat-api');

login({email: "rjcombatarms@gmail.com", password: "tomato123"}, function callback (err, api) {
    if(err) return console.error(err);

    /*api.listen(function callback(err, message) {
    	console.log(message);
        api.sendMessage(message.body, message.threadID);
    });*/
		api.setOptions({listenEvents: true});

		    var stopListening = api.listen(function(err, event) {
		        if(err) return console.error(err);

		        switch(event.type) {
		          case "message":
		            if(event.body === '/stop') {
		              api.sendMessage("Goodbye...", event.threadID);
		              return stopListening();
		            }
		            api.markAsRead(event.threadID, function(err) {
		              if(err) console.log(err);
		            });
		            //api.sendMessage("TEST BOT: " + event.body, event.threadID);
		            if(typeof event.attachments.stickerID !== 'undefined'){
		       			api.sendMessage("TEST BOT: " + event.attachments.stickerID, event.threadID);
		            }
		            break;
		          case "event":
		            console.log(event);
		            break;
		        }
		    });

});