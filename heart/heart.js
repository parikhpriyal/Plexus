var net = require('net');
var HOST = '192.168.1.102';
var PORT = 6994;

var client = new net.Socket();

var gpio = require('onoff').Gpio;
var bled = new gpio(17, 'out'),
	rled = new gpio(23, 'out');


client.connect(PORT, HOST, function() {


    console.log('CONNECTED TO: ' + HOST + ':' + PORT);
    bled.writeSync(1);
    
    pump();
    
    client.write('I am Bruce Lee!');

	client.on('data', function(data) {
	    console.log('DATA: ' + data);
	    light();
	});
});


function light(){
	iv = setInterval(function () {
  		bled.writeSync(bled.readSync() ^ 1); 
	}, 200);

	setTimeout(function () {
		clearInterval(iv); 
		bled.writeSync(1);  
		// bled.unexport();    
	}, 5000);
}

function pump(){
	setInterval(function () {
  		rled.writeSync(rled.readSync() ^ 1); 
	}, 400);

	setTimeout(function () {
		clearInterval(iv); 
		rled.writeSync(0);  
	}, 5000);
}