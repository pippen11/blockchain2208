document.forms["sign-up"].onsubmit = async function (e) {
  e.preventDefault();
  if (
    !e.target["user-id"].value ||
    !e.target["user-pw"].value ||
    !e.target["user-name"].value ||
    !e.target["user-class"].value
  )
    return;
  try {
    await axios.post("/api/user/regist", {
      id: e.target["user-id"].value,
      pw: e.target["user-pw"].value,
      name: e.target["user-name"].value,
      className: e.target["user-class"].value,
    });
  } catch (error) {
    console.log(error.responce.data.message);
  }
};
