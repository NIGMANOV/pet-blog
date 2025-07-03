interface IAuthorization {
  message: string;
}

export default function authorization(): void {
  document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
    <header></header>
<main class="min-h-screen flex items-center justify-center bg-gray-100">
  <div class="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg">
    <h2 class="text-2xl font-bold mb-6 text-center text-gray-800">Авторизация</h2>

    <!-- Контейнер для вывода сообщений -->
    <div id="authorization-message"></div>

    <form action="" id="form-authorization" method="post" class="space-y-4">
      <div>
        <label for="form-email" class="block text-sm font-medium text-gray-700 mb-1">Email</label>
        <input type="email" name="email" id="form-email" required
          class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
      </div>

      <div>
        <label for="form-password" class="block text-sm font-medium text-gray-700 mb-1">Пароль</label>
        <input type="password" name="password" id="form-password" required
          class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
      </div>

      <button type="submit"
        class="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors duration-300">
        Sign in
      </button>
    </form>

    <p class="mt-4 text-center text-sm text-gray-600">
      Нет аккаунта?
      <a href="/registration" data-link class="text-blue-600 hover:underline">Регистрация</a>
    </p>
  </div>
</main>
    <footer></footer>
    `;
  const formAuthorization = document.getElementById(
    "form-authorization"
  ) as HTMLFormElement;
  const divAuthorization = document.getElementById(
    "authorization-message"
  ) as HTMLDivElement;

  const apiAuthorization = async (
    email: string,
    password: string
  ): Promise<IAuthorization | null> => {
    try {
      const response = await fetch(
        "http://localhost:4451/api/user/authorization",
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
    message.className =
      "mt-4 mb-4 text-sm font-medium px-4 py-2 rounded-lg text-center";

    const existing = divAuthorization?.querySelector("p");
    if (existing) existing.remove();

    if (!email || !password) {
      message.textContent = "Введите логин и пароль";
      message.classList.add(
        "text-red-600",
        "bg-red-100",
        "border",
        "border-red-300"
      );
      divAuthorization?.appendChild(message);
      return;
    }

    const result = await apiAuthorization(email, password);

    if (!result || result.message !== "Вы успешно авторизовались") {
      message.textContent = "Неверный логин или пароль";
      message.classList.add(
        "text-red-600",
        "bg-red-100",
        "border",
        "border-red-300"
      );
      divAuthorization?.appendChild(message);
      return;
    }

    message.textContent = "Вы успешно авторизовались";
    message.classList.add(
      "text-green-700",
      "bg-green-100",
      "border",
      "border-green-300"
    );
    divAuthorization?.appendChild(message);

    setTimeout((): void => {
      message.remove(); // Убираем сообщение
    }, 2000);

    setTimeout((): void => {
      window.location.href = "/home";
    }, 2000);
  });
}
