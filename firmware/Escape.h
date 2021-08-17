
#include "LastDelete.h"
#include "define.h"

class Escape : public LastDelete{
  using LastDelete::LastDelete;
  public:
    uint8_t getData(){
      return data;
    }
    bool getIsStart(){
      return LastDelete::getIsStart();
    }
    bool update() {
      if(!LastDelete::update()){
        return false; //データが届いていなかったら
      }
      if( LastDelete::getIsStart() ){
        data = 0;
        pastData = 0;
        return true;
      }
      uint8_t nowData = LastDelete::getData();
      if( nowData==ESC ){
        //無視
        pastData = nowData;
        if(DEBUG_ESCAPE){
          Serial.print("escape ESC");
        }
        return false;
      }
      if( pastData==ESC ){
        if( (nowData!=(ESC^MASK)) && (nowData!=(0^MASK)) && (nowData!=(ST1^MASK)) && (nowData!=(ST2^MASK)) ){
          if(DEBUG_ESCAPE){
            Serial.print("error ESC=>");
            Serial.print(bitRead(data,3));
            Serial.print(bitRead(data,2));
            Serial.print(bitRead(data,1));
            Serial.println(bitRead(data,0));
          }
          return false;
        }
        data = nowData;
        if(DEBUG_ESCAPE){
          Serial.print("escape next ");
          Serial.print(bitRead(data,3));
          Serial.print(bitRead(data,2));
          Serial.print(bitRead(data,1));
          Serial.println(bitRead(data,0));
        }
      }
      else{
        data = nowData^MASK;
        if(DEBUG_ESCAPE){
          Serial.print("escape normal ");
          Serial.print(bitRead(data,3));
          Serial.print(bitRead(data,2));
          Serial.print(bitRead(data,1));
          Serial.println(bitRead(data,0));
        }
      }
      pastData = nowData;
      return true;
    }
  private:
    uint8_t data;
    uint8_t pastData = 0;
};
