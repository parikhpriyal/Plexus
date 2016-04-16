#include <RFduinoGZLL.h>

device_t role = HOST;

void setup()
{
  Serial.begin(9600); // begin serial communications
  // start the GZLL stack  

  RFduinoGZLL.begin(role);
}

void loop()
{
}

void RFduinoGZLL_onReceive(device_t device, int rssi, char *data, int len)
{
  if (data[0] == 97){  // get the current state from DEVICE0
    Serial.println(data);
  }
  if (data[0] == 99){  // get the current state from DEVICE0
    Serial.println(data);
  }
}  
