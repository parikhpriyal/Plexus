var net = require('net');
var HOST = 'IP ADDRESS';
var PORT = PORT NUMBER;

var client = new net.Socket();

var gpio = require('onoff').Gpio;
var bled = new gpio(17, 'out'),
	rled = new gpio(23, 'out');


client.connect(PORT, HOST, function() {


    console.log('CONNECTED TO: ' + HOST + ':' + PORT);
    
    pump();
    
    client.write('Plexus in process...');

	client.on('data', function(data) {
	    console.log('DATA: ' + data);
	    light();
	});
});


function light(){
	var iv = setInterval(function () {
  		bled.writeSync(bled.readSync() ^ 1); 
	}, 300);

	setTimeout(function () {
		clearInterval(iv); 
		bled.writeSync(1);  
		// bled.writeSync(0);    
	}, 3000);
}

function pump(){
	setInterval(function () {
  		rled.writeSync(rled.readSync() ^ 1); 
	}, 400);

	setTimeout(function () {
		// clearInterval(iv); 
		rled.writeSync(1);  
	}, 5000);
}
