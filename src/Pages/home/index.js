const renderFinancesElements = (data) => {
  const totalItems = data.length;
  const revenues = data
    .filter((item) => Number(item.value) > 0)
    .reduce((acc, item) => acc + Number(item.value), 0);
  const expenses = data
    .filter((item) => Number(item.value) < 0)
    .reduce((acc, item) => acc + Number(item.value), 0);
  const totalValue = revenues + expenses;

  // render total items
  const financeCard1 = document.getElementById("finance-card-1");
  const totalText = document.createTextNode(totalItems);
  const totalElement = document.createElement("h1");
  totalElement.className = "mt smaller";
  totalElement.appendChild(totalText);
  financeCard1.appendChild(totalElement);

  // render revenues
  const financeCard2 = document.getElementById("finance-card-2");
  const revenueText = document.createTextNode(
    new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(revenues)
  );
  const revenuesTextElement = document.createElement("h1");
  revenuesTextElement.className = "mt smaller";
  revenuesTextElement.appendChild(revenueText);
  financeCard2.appendChild(revenuesTextElement);

  // render expenses
  const financeCard3 = document.getElementById("finance-card-3");
  const expensesText = document.createTextNode(
    new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(expenses)
  );
  const expensesTextElement = document.createElement("h1");
  expensesTextElement.className = "mt smaller";
  expensesTextElement.appendChild(expensesText);
  financeCard3.appendChild(expensesTextElement);

  // render balance
  const financeCard4 = document.getElementById("finance-card-4");
  const balancetext = document.createTextNode(
    new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(totalValue)
  );
  const balanceTextElement = document.createElement("h1");
  balanceTextElement.className = "mt smaller";
  balanceTextElement.style.color = "#5936cd";
  balanceTextElement.appendChild(balancetext);
  financeCard4.appendChild(balanceTextElement);
};

const onLoadFinancesData = async () => {
  try {
    const date = "2022-12-15";
    const email = localStorage.getItem("@walletApp:userEmail");
    const result = await fetch(
      `https://mp-wallet-app-api.herokuapp.com/finances?date=${date}`,
      {
        method: "GET",
        headers: {
          email: email,
        },
      }
    );
    const data = await result.json();
    renderFinancesElements(data);
    return data;
  } catch (error) {
    return { error };
  }
};

const onLoadUserInfo = () => {
  const email = localStorage.getItem("@walletApp:userEmail");
  const name = localStorage.getItem("@walletApp:userName");

  const navbarUserInfo = document.getElementById("navbar-user-container");
  const navbarUserAvatar = document.getElementById("navbar-user-avatar");

  // add user email
  const emailElement = document.createElement("p");
  const emailText = document.createTextNode(email);
  emailElement.appendChild(emailText);
  navbarUserInfo.appendChild(emailElement);

  // add logout link
  const logoutElement = document.createElement("a");
  const logoutText = document.createTextNode("sair");
  logoutElement.appendChild(logoutText);
  navbarUserInfo.appendChild(logoutElement);

  // add user first letter inside avatar
  const nameElement = document.createElement("h3");
  const nameText = document.createTextNode(name.charAt(0));
  nameElement.appendChild(nameText);
  navbarUserAvatar.appendChild(nameElement);
};

window.onload = () => {
  onLoadUserInfo();
  onLoadFinancesData();
};
