
#include "Escape.h"
#include "define.h"

class JoinHalfByte : public Escape {
  using Escape::Escape;
  public:
    uint8_t getData(){
      return data;
    }
    bool getIsStart(){
      return Escape::getIsStart();
    }
    bool update() {
      if(!Escape::update()){
        return false; //データが届いていなかったら
      }
      if( Escape::getIsStart() ){
        bitUpDown = false;
        return true;
      }
      if(bitUpDown){
        data = (Escape::getData()<<4)&0b11110000;  //上位ビットに書き込み
        data += pastData&0b00001111;
        bitUpDown = false;
        if(DEBUG_JOIN){
          Serial.print("join ");
          Serial.print(bitRead(data,7));
          Serial.print(bitRead(data,6));
          Serial.print(bitRead(data,5));
          Serial.print(bitRead(data,4));
          Serial.print(bitRead(data,3));
          Serial.print(bitRead(data,2));
          Serial.print(bitRead(data,1));
          Serial.println(bitRead(data,0));
          Serial.println(data);
          Serial.println();
        }
        return true;
      }
      else{
        pastData = Escape::getData();  //下位ビットに書き込み
        bitUpDown = true;
        return false;
      }
    }
  private:
    bool bitUpDown = false;
    uint8_t data;
    uint8_t pastData;
};
