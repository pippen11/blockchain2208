const saveBtn = document.getElementById("save");

const cancle = document.getElementById("cancle");

const title_name = document.getElementById("title");

document.getElementById("fileadd").onsubmit = async (e) => {
  e.preventDefault();

  const { book_img, title, title_sub, introduce, publisher } = e.target;

  let formData = new FormData();

  formData.append("book_img", book_img.files[0]);
  formData.append("title", title.value);
  formData.append("title_sub", title_sub.value);

  formData.append("introduce", introduce.value);
  formData.append("category", getValue());
  formData.append("publisher", publisher.value);
  const data = await axios.post("/v3/bookAdd/upload", formData);
};

function getValue() {
  const category = document.getElementById("category");
  return category.options[category.selectedIndex].value;
}
