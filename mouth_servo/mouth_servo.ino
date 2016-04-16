#include <Servo.h>

Servo myservo;

void setup() {
  // put your setup code here, to run once:
  Serial.begin(9600);
  myservo.attach(6);
}

void loop() {
  // put your main code here, to run repeatedly:
  myservo.write(90);    // Tell servo to go to 90 degrees

  delay(1000);         // Pause to get it time to move

  myservo.write(180);   // Tell servo to go to 180 degrees

  delay(1000);         // Pause to get it time to move

  myservo.write(0);     // Tell servo to go to 0 degrees

  delay(1000);     

}
