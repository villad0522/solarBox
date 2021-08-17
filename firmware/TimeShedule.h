
#include "Buzzer.h"

class TimeShedule : public Buzzer{
  using Buzzer::Buzzer;
  public:
    int getSetHour(){
      return setHour;
    }
    int getSetMin(){
      return setMin;
    }
    bool getData( int hour, int min ){
      int index = (hour*4) + (int)(min/15);
      if( 0<index && index<96 ){
        return data[index];
      }
      return false;
    }
    bool update(){
      if(!Buzzer::update()){
        return false; //データが届いていなかったら
      }
      uint8_t firstByte = Buzzer::getData(1);
      uint8_t mode = firstByte&0b00000111;
      setHour = (firstByte>>3)&0b00011111;
      setMin = Buzzer::getData(2);
      int pastIndex = 0;
      bool pastValue = false;
      for (int i=3; i<Buzzer::getSize(); i++){
        uint8_t d = Buzzer::getData(i);
        uint8_t hour = (d>>3)&0b00011111;
        uint8_t min = ((d>>1)&0b00000011);
        bool nowValue = (d&0b00000001)==1;
        int nowIndex = hour*4+min;
        for (int j=pastIndex; j<nowIndex; j++){
          data[j] = pastValue;
          if( mode == 1 ){
            pastValue = !pastValue;
          }
        }
        pastValue = nowValue;
        pastIndex = nowIndex;
      }
      for (int j=pastIndex; j<96; j++){
        data[j] = pastValue;
        if( mode == 1 ){
          pastValue = !pastValue;
        }
      }
      Serial.println("========================");
      Serial.print("now ");
      Serial.print(setHour);
      Serial.print(":");
      Serial.println(setMin);
      for (int i=0; i<96; i++){
        print2digits((int)(i/4));
        Serial.print(":");
        print2digits((i%4)*15);
        Serial.print(" ");
        if(data[i]){
          Serial.println("ON");
        }
        else{
          Serial.println("OFF");
        }
      }
      Serial.println("========================");
      return true;
    }
  private:
    uint8_t setHour = 0;
    uint8_t setMin = 0;
    bool data[96];
    void print2digits(int number) {
      if (number >= 0 && number < 10) {
        Serial.write('0');
      }
      Serial.print(number);
    }
};
