
#include "Differential.h"
#include "define.h"

class Combo{
  public:
    uint8_t getData(){
      return data;
    }
    bool update(){
      differential[0].update();
      differential[1].update();
      differential[2].update();
      differential[3].update();
      //
      uint8_t nowChange = 0;
      nowChange = (differential[0].getChange()<<0)&0b00000001;
      nowChange += (differential[1].getChange()<<1)&0b00000010;
      nowChange += (differential[2].getChange()<<2)&0b00000100;
      nowChange += (differential[3].getChange()<<3)&0b00001000;
      //
      if(nowChange!=0){
        //値が決定していない
        onTheWay |= nowChange;
        return false;
      }
      if(onTheWay==0){
        return false;
      }
      data = onTheWay;
      onTheWay = 0;
      if(DEBUG_COMBO){
        Serial.print("combo ");
        Serial.print(bitRead(data,3));
        Serial.print(bitRead(data,2));
        Serial.print(bitRead(data,1));
        Serial.println(bitRead(data,0));
      }
      return true;
    }
  private:
    uint8_t data = 0;
    uint8_t onTheWay = 0; //作成途中のデータ
    Differential differential[4] = {
      Differential(0),
      Differential(1),
      Differential(2),
      Differential(3)
    };
};
