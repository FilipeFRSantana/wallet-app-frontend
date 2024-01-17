const validateUser = async (email) => {
  try {
    const result = await fetch(
      `https://mp-wallet-app-api.herokuapp.com/users?=${email}`
    );
    const user = await result.json();
    return user;
  } catch (error) {
    return { error };
  }
};

const onClickLogin = async () => {
  const email = document.getElementById("input-email").value;
  if (email.length < 5 || !email.includes("@")) {
    alert("E-mail Invalido!");
    return;
  }
  const result = await validateUser(email);
  console.log(result);
  if (result.error) {
    alert("Falha ao validar e-mail.");
    return;
  }

  // Qualquer coisa assistir a aula 5 do modulo de fornt-end

  localStorage.setItem("@walletApp:userEmail", result.email);
  localStorage.setItem("@walletApp:userName", result.name);
  localStorage.setItem("@walletApp:userId", result.id);
  window.open("./src/Pages/home/index.html", "_self");
};
