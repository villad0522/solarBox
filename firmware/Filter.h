
#define BUFF_SIZE 10

class Filter{
  public:
    int update(int val){
      //移動平均
      buff[avgCount] = val;
      avgCount++;
      if(avgCount>=BUFF_SIZE){
        avgCount = 0;
      }
      int sum = 0;
      for( int i=0; i<BUFF_SIZE; i++ ){
        sum += buff[i];
      }
      return sum/BUFF_SIZE;
    }
  private:
    int buff[BUFF_SIZE];
    int avgCount = 0;
};
