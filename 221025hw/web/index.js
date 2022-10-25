document.getElementById("join-btn").onclick = async function (e) {
  e.preventDefault;
  const data = await axios.post("/api/user/regist", {
    id: document.forms["main-form"].id.value,
    pw: document.forms["main-form"].pw.value,
    name: document.forms["main-form"].name.value,
  });
  console.log(data.data);
  console.log(document.cookie);
};
