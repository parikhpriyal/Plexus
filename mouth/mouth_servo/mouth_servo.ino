#include <Servo.h>

Servo servo;
int angle = 0;

void setup() {
  Serial.begin(9600);
  servo.attach(9);
}

void loop() {
  while(Serial.available() > 0){
    char incoming = Serial.read();
    Serial.println(incoming);
  
    if(incoming == 'A'){
      Serial.print(incoming);
      for (angle = 0; angle < 180; angle++) {
        servo.write(angle);
        delay(15);
      }
      for (angle = 180; angle > 0; angle--) {
        servo.write(angle);
        delay(15);
      }
    }
  }
}
