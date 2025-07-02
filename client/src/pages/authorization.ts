interface IAuthorization {
  message: string;
}

export default function authorization(): void {
  document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <header></header>
    <main class="main">
        <div class="container">
            <div class="authorization">
                <form action="" id="form-authorization" method="post">
                    <input type="email" name="email" id="form-email">
                    <input type="password" name="password" id="form-password">

                    <button type="submit">Sign in</button>
                </form>
            </div>
            <a href="/registration" data-link>регистрация</a>
        </div>
    </main>
  <footer></footer>
  `;
  const formAuthorization = document.getElementById(
    "form-authorization"
  ) as HTMLFormElement;
  const divAuthorization = document.querySelector(
    ".authorization"
  ) as HTMLDivElement;

  const apiAuthorization = async (
    email: string,
    password: string
  ): Promise<IAuthorization | null> => {
    try {
      const response = await fetch(
        "http://localhost:4448/api/user/authorization",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );

      if (!response.ok) {
        throw new Error(`Ошибка сервера: ${response.status}`);
      }

      const data: IAuthorization = await response.json();
      console.log(data);

      return data;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  formAuthorization?.addEventListener("submit", async (e): Promise<void> => {
    e.preventDefault();

    const emailElement = document.getElementById(
      "form-email"
    ) as HTMLInputElement;
    const passwordElement = document.getElementById(
      "form-password"
    ) as HTMLInputElement;

    const email = emailElement.value.trim();
    const password = passwordElement.value.trim();

    const message = document.createElement("p") as HTMLParagraphElement;
    const existing = divAuthorization?.querySelector("p");
    if (existing) existing.remove();

    if (!email || !password) {
      message.textContent = "Введите логин и пароль";
      message.style.color = "red";
      divAuthorization.append(message);
      return;
    }

    const result = await apiAuthorization(email, password);

    if (!result || result.message !== "Вы успешно авторизовались") {
      message.textContent = "Неверный логин или пароль";
      message.style.color = "red";
      divAuthorization.append(message);
      return;
    }

    message.textContent = "Вы успешно авторизовались";
    message.style.color = "green";
    divAuthorization.append(message);

    setTimeout((): void => {
      window.location.href = "../pages/main.html";
    }, 2000);
  });
}
