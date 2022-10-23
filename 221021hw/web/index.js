document.getElementById("main-add").onsubmit = async function (e) {
  e.preventDefault();
  if (!e.target["main-id"].value) {
    e.target["main-id"].focus();
    return;
  }
  if (!e.target["main-pw"].value) {
    e.target["main-pw"].focus();
    return;
  }

  try {
    const data = await axios.post("/api/board/add", {
      id: e.target["main-id"].value,
      pw: e.target["main-pw"].value,
    });
    // console.log(data);
    if (data.data.status == 200) {
      e.target["main-id"].value = e.target["main-pw"].value = "";
      alert("성공");
    }
  } catch (err) {
    console.error(err);
  }
};
