
#include <EEPROM.h>
#include "CheckSum.h"
#include "define.h"

class LargeSerial : public CheckSum{
  using CheckSum::CheckSum;
  public:
    LargeSerial(){
      for (int i=0; i<PACKET_NUM; i++){
        flag[i] = false;
      }
      isInit = true;
      target = 2;
    }
    bool getIsInit(){
      return isInit;
    }
    uint8_t getData(int address){
      if( address < 0 ){
        return 0;
      }
      if( address >= DATA_SIZE ){
        return 0;
      }
      if(target==1){
        return data[0][address];
      }
      else{
        return data[1][address];
      }
    }
    int getSize(){
      if(target==1){
        return byteSize[0];
      }
      else{
        return byteSize[1];
      }
    }
    bool update(){
      //==================================================================
      //EEPROM 読み取り
      if( target == 2 ){
        byteSize[0] = EEPROM.read(0);
        if(byteSize[0]>=DATA_SIZE){
          byteSize[0]=DATA_SIZE;
        }
        for (int i=1; i<byteSize[0]; i++){
          data[0][i] = EEPROM.read(i);
        }
        target = 1;
        return true;
      }
      //==================================================================
      //可視光通信 受信
      if(!CheckSum::update()){
        return false; //データが届いていなかったら
      }
      uint8_t baseAddress = CheckSum::getData(0);
      if( baseAddress == 0 ){
        packetNum = CheckSum::getData(1); //パケットの個数
      }
      for (int i = 1; i < CheckSum::getSize(); i++){
        uint8_t address = baseAddress+i-1;
        uint8_t byteData = CheckSum::getData(i);
        if( address < DATA_SIZE ){
          data[target][address] = byteData;
          if(byteSize[target]<(address+1)){
            byteSize[target] = address+1;
          }
        }
      }
      int packetCount = baseAddress / PACKET_SIZE;
      if(PACKET_NUM <= packetCount){
        return false; //予期せぬエラー。パケットサイズオーバー。
      }
      if(!flag[packetCount]){
        //まだ受け取っていないパケットなら
        count++;
        flag[packetCount] = true;
      }
      //==================================================================
      //全てのパケットを受け取ったかどうかの判定
      if( packetNum==0 ){
        return false; //まだデータサイズが不明なら
      }
      if( count < packetNum ){
        return false; //まだ受け取っていないパケットがあるなら
      }
      //==================================================================
      //全てのパケットを受け取ったら
      if(byteSize[target]>=DATA_SIZE){
        byteSize[target]=DATA_SIZE;
      }
      EEPROM.write(0,byteSize[target]);
      for (int i=1; i<byteSize[target]; i++){
        EEPROM.write(i,data[target][i]);
      }
      count = 0;
      packetNum = 0;
      for (int i=0; i<PACKET_NUM; i++){
        flag[i] = false;
      }
      if(target==1){
        target = 0;
      }
      else{
        target = 1;
      }
      byteSize[target] = 0;
      //==================================================================
      isInit = false;
      return true;
    }
  private:
    bool isInit = true;
    int packetNum = 0;
    uint8_t data[2][DATA_SIZE];
    int byteSize[2] = {0,0};
    bool flag[PACKET_NUM];
    int count = 0;
    uint8_t target = 2;
};
