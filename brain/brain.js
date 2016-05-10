var net = require('net');
var PORT = PORT NUMBER;
var HOST = 'IP ADDRESS';

var serialport = require("serialport");
var SerialPort = serialport.SerialPort;
var eport = new SerialPort("/dev/ttyAMA0", {
  baudrate: 9600,
  parser: serialport.parsers.readline("\n")
}, false); // this is the openImmediately flag [default is true]

var gpio = require('onoff').Gpio,
    intervalId,
    durationId,
    led = new gpio(17, 'out');


net.createServer( function (sock) {
   
  console.log('CONNECTED: ' + sock.remoteAddress +':'+ sock.remotePort);

  led.writeSync(1);

  sock.on('data', function(data) {
        
        console.log('DATA ' + sock.remoteAddress + ': ' + data);
        //// Write the data back to the socket, the client will receive it as data from the server
        sock.write('This is Server Response - Client sent"' + data + '"');
        
  });

  eport.open(function(error) {

    if (error) {
      console.log('failed to open: ' + error);
    } else {
      console.log('Serial open');
      eport.on('data', function(data) {
      //console.log('data length: ' + data.length);
      // console.log(data);
        var data_array = data.split(",");

        for(var i = 0; i < data_array.length; i++) {
          data_array[i] = data_array[i].replace(/^\s*/, "").replace(/\s*$/, "");
        }

        if('a' === data_array[0]){
          console.log("Impulse from hand");
          console.log("Response to heart");
          sock.write('Impulse from hand via brain');
        }
        else if('c' === data_array[0]){
          console.log("Impulse from foot");
          console.log("Response to mouth");
          sock.write('Impulse from foot via brain');
        }

        // blink(5);
        light();
      });
    }
  });
}).listen(PORT, HOST);

console.log('Server listening on ' + HOST +':'+ PORT);

function light(){
  var iv = setInterval(function () {
    led.writeSync(led.readSync() ^ 1); // 1 = on, 0 = off :)
  }, 200);

  setTimeout(function () {
    clearInterval(iv); // Stop blinking
    led.writeSync(1);  // Turn LED off.
    // led.unexport();    // Unexport GPIO and free resources
  }, 5000);
}