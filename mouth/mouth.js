
var net = require('net'),
    HOST = 'IP ADDRESS',
    PORT = PORT NUMBER,
    client = new net.Socket(),
    gpio = require('onoff').Gpio,
    serialport = require('serialport'),
    SerialPort = serialport.SerialPort,
    sport = new SerialPort("/dev/ttyAMA0",{
        baudrate: 9600,
        parser: serialport.parsers.readline('\n')
    }, false);


client.connect(PORT, HOST, function() {

    console.log('CONNECTED TO: ' + HOST + ':' + PORT);
    
    client.write('Mouth connected');
    
    sport.open(function(error){
        if(error)
            console.log('failed to open: ' + error);
        else{
            console.log('serial connected');

            client.on('data', function(data) {
                
                var data_string = data.toString();

                if ('c' === data_string){
                    console.log('DATA: ' + data);
                    sport.write('A');
                }
                else{
                    console.log('waiting for impulse');
                }
            });
        }
    })
});
Status API Training Shop Blog About
