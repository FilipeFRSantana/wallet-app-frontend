const onClickLogin = () => {
  const email = document.getElementById("input-email").value;
  if (email.length < 5 || !email.includes("@")) {
    alert("E-mail Invalido!");
    return;
  }

  localStorage.setItem("@walletApp:userEmail", email);
  window.open("./src/Pages/home/index.html", "_self");
};
