
#include "Combo.h"
#include "define.h"

class Rotate : public Combo{
  using Combo::Combo;
  public:
    uint8_t getData(){
      return data;
    }
    bool getIsStart(){
      return isStart;
    }
    bool update(){
      if( !Combo::update() ){
        return false;
      }
      uint8_t original = Combo::getData();
      //
      if(original==0b0101 || original==0b1010){
        //スタートビットを受信
        isStart = true;
        data = 0;
        return true;
      }
      else if(isStart){
        //方向ビットを受信
        if(original==0b1110){
          shift = 0;
        }
        else if(original==0b1101){
          shift = 1;
        }
        else if(original==0b1011){
          shift = 2;
        }
        else if(original==0b0111){
          shift = 3;
        }
        isStart = false;
        data = 0;
        return false;
      }
      uint8_t buf = ((original<<4)&0b11110000) + original;
      data = ( buf >> shift ) & 0b00001111;
      if(DEBUG_ROTATE){
        Serial.print("rotate ");
        Serial.print(bitRead(data,3));
        Serial.print(bitRead(data,2));
        Serial.print(bitRead(data,1));
        Serial.println(bitRead(data,0));
      }
      return true;
    }
  private:
    uint8_t data = 0;
    bool isStart = false;
    int shift = 0;
};
