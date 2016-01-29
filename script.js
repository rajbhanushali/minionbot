var login = require('facebook-chat-api');
var readyforkick = false;

login({email: "rjcombatarms@gmail.com", password: "tomato123"}, function callback (err, api) {
    if(err) return console.error(err);

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
		           // console.log(event.attachments[1].stickerID);
		           if(event.attachments.length !== 0 && event.attachments[0].type=="sticker"){
		           		//api.sendMessage("stickerid: " + event.attachments[0].stickerID + " packid: " + event.attachments[0].packID, event.threadID);
		           		if(event.attachments[0].packID == "1598049900458312" || event.attachments[0].packID == "210412585774633"){

		           			api.sendMessage("get dat MOFO", event.threadID);

		           			if(readyforkick){

		           				api.sendMessage("kicking ur ass...", event.threadID);
		           				api.removeUserFromGroup(event.senderID, event.threadID, function(err){if(err){api.sendMessage("error kicking", event.threadID);}else{api.sendMessage("u r ded", event.threadID);}});

		           			}

		           			readyforkick = true;
		           		}
		           }

		           if(event.attachments.length == 0){
		           	readyforkick=false;
		           }
		            
		            break;
		          case "event":
		            console.log(event);
		            break;
		        }
		    });

});