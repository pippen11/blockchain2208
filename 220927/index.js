let count = 0;

function solution(num) {
  if (num == 1) return 0;
  while (num != 1) {
    if (count == 500) return -1;
    count++;
    if (num % 2 == 0) {
      num = num / 2;
    } else {
      num = num * 3 + 1;
    }
  }
  return count;
}


function solution(num){
  let answer=0;
  while(num!=1&&anser++<500){
    num=num%2?num*3+!:num/2;
  }
  return num== 1? answer:-1
}


if(answer++==500)return-1;
if(num%2){
  num=num*3+1
}else{
  num/=2
}
return answer;
}


for(;num!=1 && answer<500;answer++){
  if(num%2==0){
    num/=2
  }else{
    num=num*3+1
  }
}