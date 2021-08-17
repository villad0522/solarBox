
#include "LargeSerial.h"
#include "define.h"

class Buzzer : public LargeSerial{
  using LargeSerial::LargeSerial;
  public:
    bool update() {
      if(pastToneTime!=0){
        if(millis()-pastToneTime>100){
          noTone(PIN_BUZZER);
          pastToneTime = 0;
        }
      }
      if(LargeSerial::update()){
        tone(PIN_BUZZER,900);
        delay(1000);
        pastToneTime = millis();
        return true;
      }
      else{
        if( CheckSum::getSuccessFlag() ){   //チェックサムと末尾が同じなら
          tone(PIN_BUZZER,900);
          pastToneTime = millis();
        }
        else if(CheckSum::getErrorFlag()){
          tone(PIN_BUZZER,100);
          pastToneTime = millis();
        }
        return false;
      }
    }
  private:
    long pastToneTime = 0;
};
