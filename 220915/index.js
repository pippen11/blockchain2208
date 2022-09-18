const list = document.getElementById("todo-list");
//const로 list를 초기화한 이유: 메서드(함수)를 호출할때마다
//javascript는 해당코드를 실행하기 때문에 실행을 최소화 하기위해서 변수에 반환값(return을 정의하여
//이후 다시찾지않고 바로 쓸수있도록 한다.
function deleteItem(num) {
  //삭제를 위한 함수
  list.children[num].classList.add("delete");
}
//list의 자식들(element)중에 num번째 자식에 'delete'라는 클래스를 추가한다
//delete 클래스를 가진 엘리먼트는 css스타일로 인해 가운데 줄이생긴다.
//li추가된것들이 children임

//다른버전
// list.innerHTML=list.innerHTML.replace(list.children[num].outerHTML,"");}

//다른버전 다른코드
// fuction deleteItem(num){
// let startIdx=0;
// let endIdx=0;
//어디서부터 어디까지 잘라줄건지
// let tempHTML= list.innerHTML;
//혹시모를 문제에 대해 따로빼줌
// for(let i =0;i<num;++i){
// startIdx= tempHTML.slice(startIdx + 4).indexOf("<li>");}
//num0이면 0번째부터 4번째까지 자르겟다

// console.log(strartIdx);
// endIdx = tempHTMl.slice(startIdx + 4).indexOF("<li>");
// console.log(endIdx);
// tempHTML = list.innerHTML;
// console.log(tempHTMl);
// list.innerHTML=tempHTMl.slice(0, startIdx) + tempHTML.slice(endIdx +4);
// console.log(list.innerHTMl);
// }

document.getElementById("todo-add").onclick = () => {
  //todo-add, 즉 추가버튼에 클릭에대한 코드를 정의한다.
  const input = document.getElementById("todo-input");
  //입력된 값을 확인하기 위해 엘리먼트를 찾아 변수에 초기화 한다.
  if (!input.value) return;
  //input은 거의 value로 들어감
  //input에 값을 입력하면 value에 저장이된다
  //입력된 값이 없으면 return, 즉 메서드를 종료한다.
  list.innerHTML +=
    '<li>${input.value}<button onclick="deleteItem(${list.children.length})">삭제</button></li>';
  //몇번째 자식인지 알아야 delete list.children.length는 0부터 시작 넘버를 매개변수로 매겨주면서 몇번째인지 알수있다
  //list, 할일목록에 li 엘리먼트를 추가한다
  //엘리먼트의 자식으로 버튼을 추가하여 list의 자식들의 길이(현재는 추가되지않았기 때문에 index처럼 사용가능)를 매개변수로 전달한다
  input.value = "";
}; //입력된 값을 없앤다
