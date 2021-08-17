
#include "Filter.h"
#define IGNORE 5    //定数IGNOREの回数ぶん、計測せずに値を使いまわす
#define DURATION 10 //結果を維持する時間(ms)

class Differential{
  public:
    Differential(){
    }
    Differential( int pinRx ){
      PIN_RX = pinRx;
    }
    int getLevel(){
      return level;
    }
    int getChange(){
      return change;
    }
    //
    void update(){
      //
      //定数IGNOREの回数ぶん、計測せずに値を使いまわす
      if(ignoreCount<IGNORE){
        ignoreCount++;
        return;
      }
      ignoreCount=0;
      //
      //変化量を求める
      int nowAnalog = filter1.update(analogRead(PIN_RX));
      int diff = filter2.update(nowAnalog-pastAnalog);
      pastAnalog = nowAnalog;
      //
      //傾きの符号を求める
      int nowSign = 0;
      if( 3 < diff ){
        nowSign = 1;
      }
      else if( diff < -3 ){
        nowSign = -1;
      }
      //
      //もし傾きが　ゼロ→プラス　ゼロ→マイナス　マイナス→プラス　プラス→マイナス　なら
      //信号が変化したと判断
      long nowTime = millis();
      if( nowSign!=0 && pastSign!=nowSign ){
        latestChangeTime = nowTime;  //信号が大きく変化したときの時刻
        level = (nowSign==1);
      }
      pastSign = nowSign;
      //
      //結果を一定時間、維持する
      long time = nowTime-latestChangeTime;
      if( time < DURATION ){
        change = 1;  //最近、変化したよ！
      }
      else{
        change = 0;  //最近、変化してないよ！
      }
    }
  private:
    Filter filter1 = Filter();
    Filter filter2 = Filter();
    int level = 0;
    int change = 0;
    uint8_t PIN_RX = 0;
    int pastSign = 0;
    int pastAnalog = 0;
    int ignoreCount = 0;
    long latestChangeTime = 0;  //信号が大きく変化したときの時刻
};
