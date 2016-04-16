#include <RFduinoGZLL.h>

device_t role = DEVICE1;

int sensor = 6;

void setup() {
  // put your setup code here, to run once:
  Serial.begin(9600);
  pinMode(sensor, INPUT);

  RFduinoGZLL.txPowerLevel = 0;
  RFduinoGZLL.begin(role);
}

void loop() {
  // put your main code here, to run repeatedly:
  char sdata[4];
  char mydata[6];
  String sstr;
  String mystr;
  
  int sensorread = analogRead (sensor);
//  Serial.println(sensorread);

  if (sensorread > 100){
    sstr = String(sensorread);
    sstr.toCharArray(sdata, 4);

    mystr = "a," + sstr;
    mystr.toCharArray(mydata, 6);
    Serial.println(mystr);
  
    RFduinoGZLL.sendToHost(mydata, 6);
    delay(250);
  }
}

// if data is recived from another rfduino
//void RFduinoGZLL_onReceive(device_t device, int rssi, char *data, int len)
//{
//  // ignore acknowledgement without payload
//  if (len > 0)
//  {
//    // set the Green led if this device is the closest device
//    device_t closest_device = (device_t)data[0];
//    //digitalWrite(green_led, (role == closest_device));
//  }
//}
