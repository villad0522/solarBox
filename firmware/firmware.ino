
#include "TimeShedule.h"

#include <Wire.h>
#include <TimeLib.h>
#include <DS1307RTC.h>

TimeShedule timeShedule = TimeShedule();
long pastTime = 0;

void setup() {
  Serial.begin(115200);
  pinMode(PIN_OUTPUT,OUTPUT);
  digitalWrite(PIN_OUTPUT,HIGH);
}

void loop() {
  if( timeShedule.update() ){
    if( !timeShedule.getIsInit() ){
      tmElements_t tm;
      tm.Hour = timeShedule.getSetHour();
      tm.Minute = timeShedule.getSetMin();
      tm.Second = 59;
      RTC.write(tm);    //時刻合わせ
    }
    pastTime = -999999;
  }
  long nowTime = millis();
  if( (nowTime-pastTime)>30000 ){
    tmElements_t tm;
    RTC.read(tm);
    bool value = timeShedule.getData( tm.Hour, tm.Minute );
    digitalWrite(PIN_OUTPUT,!value);
    pastTime = nowTime;
    Serial.print(tm.Hour);
    Serial.print(":");
    Serial.print(tm.Minute);
    Serial.print(" ");
    if(value){
      Serial.println("ON");
    }
    else{
      Serial.println("OFF");
    }
  }
}

/*
#include "CheckSumTest.h"
CheckSumTest test = CheckSumTest();

//#include "JoinHalfByteTest.h"
//JoinHalfByteTest test = JoinHalfByteTest();

//#include "EscapeTest.h"
//EscapeTest test = EscapeTest();

//#include "LastDeleteTest.h"
//LastDeleteTest test = LastDeleteTest();

//#include "RotateTest.h"
//RotateTest test = RotateTest();

//#include "ComboTest.h"
//ComboTest test = ComboTest();

void setup() {
  Serial.begin(115200);
  pinMode(PIN_OUTPUT,OUTPUT);
}
void loop() {
  test.update();
}*/
