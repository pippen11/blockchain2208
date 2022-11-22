const item = document.getElementsByClassName("item");

console.log(item);

for (let i = 0; i < item.length; i++) {
  item[i].onclick = () => {
    location.href = "./booklist?" + i;
  };
}
