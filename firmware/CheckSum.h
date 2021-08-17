
#include "JoinHalfByte.h"
#include "define.h"

class CheckSum : public JoinHalfByte {
  using JoinHalfByte::JoinHalfByte;
  public:
    uint8_t getData(int index){
      if(index>=PACKET_SIZE+3){
        return 0;
      }
      if(index<0){
        return 0;
      }
      return datas[index];
    }
    int getSize(){
      return size;
    }
    bool getSuccessFlag(){
      return successFlag;
    }
    bool getErrorFlag(){
      return errorFlag;
    }
    //
    bool update() {
      successFlag = false;
      errorFlag = false;
      if(!JoinHalfByte::update()){
        return false; //データが届いていなかったら
      }
      if(!JoinHalfByte::getIsStart()){
        datas[index] = JoinHalfByte::getData();
        index++;
        if(index>=(PACKET_SIZE+3)){
          index = 0;          //オーバーフロー対策
        }
        return false; //受信中
      }
      //
      //もしもスタートビットが来たら
      size = index-1;
      index = 0;
      if(size<1){
        return false;
      }
      checkSumData = datas[size];
      //
      uint8_t currentCheckSum = 0x00;
      for( int i=0; i<size; i++ ){
        uint16_t buf = (((uint16_t)datas[i]<<8)&0xFF00)+(uint16_t)datas[i];
        currentCheckSum ^= (uint8_t)(buf>>(i%8));
      }
      if( currentCheckSum == checkSumData ){   //チェックサムと末尾が同じなら
        successFlag = true;
      }
      else{
        errorFlag = true;
      }
      return successFlag;
    }
  private:
    int index = 0;
    bool successFlag = false;
    bool errorFlag = false;
    int size = 0;
    uint8_t datas[PACKET_SIZE+3];
    uint8_t checkSumData = 0;
};
