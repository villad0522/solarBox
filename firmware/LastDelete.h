
#include "Rotate.h"
#include "define.h"

// スタートビットの直前のデータを不採用にする
//
//   今回:3
// １回前:1
// ２回前:9            =>採用
//
//   今回:8
// １回前:スタートビット
// ２回前:3            =>不採用
//
//   今回:8
// １回前:スタートビット
// ２回前:スタートビット =>不採用
//
//   今回:スタートビット
// １回前:スタートビット
// ２回前:10           =>採用
//
//   今回:3
// １回前:1
// ２回前:ESC           =>採用
//
//   今回:8
// １回前:スタートビット
// ２回前:ESC           =>不採用
//
//   今回:スタートビット
// １回前:ESC
// ２回前:ESC           =>不採用
//
//   今回:スタートビット
// １回前:3
// ２回前:ESC           =>不採用


class LastDelete : public Rotate{
  using Rotate::Rotate;
  public:
    uint8_t getData(){
      return data[2];  // ２回前のデータを採用する
    }
    bool getIsStart(){
      return isStart[2];  // ２回前のデータを採用する
    }
    bool update() {
      if(!Rotate::update()){
        return false; //データが届いていなかったら
      }
      data[2] = data[1];    // ２回前のデータ
      data[1] = data[0];    // １回前のデータ
      data[0] = Rotate::getData();  // 今回のデータ
      //
      isStart[2] = isStart[1];    // ２回前のデータ
      isStart[1] = isStart[0];    // １回前のデータ
      isStart[0] = Rotate::getIsStart();  // 今回のデータ
      //
      if( !isStart[0] && isStart[1] ){
        return false; //スタートビットの１個前のデータは無視
      }
      if( ( isStart[0] || isStart[1] ) && data==ESC ){
        return false; //スタートビットの１個前や２個前に存在するESCは無視
      }
      else{
        if(DEBUG_LAST_DELETE){
          Serial.print("lastDelete ");
          Serial.print(bitRead(data[2],3));
          Serial.print(bitRead(data[2],2));
          Serial.print(bitRead(data[2],1));
          Serial.println(bitRead(data[2],0));
        }
        return true;
      }
    }
  private:
    uint8_t data[3] = {0,0,0};
    bool isStart[3] = {false,false,false};
};
