const logo = document.getElementById("logo");

logo.onclick = () => {
  location.href = "http://localhost:8080/";
};

const item = document.getElementsByClassName("item");

for (let i = 0; i < item.length; i++) {
  item[i].onclick = () => {
    location.href = "./booklist?" + i;
  };
}
