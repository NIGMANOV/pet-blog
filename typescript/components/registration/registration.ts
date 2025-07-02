interface IUser {
  id: number;
  email: string;
  password: string;
  createdAt: string;
  updatedAt: string;
}

interface IRegistration {
  message: string;
  user: IUser;
}

export default function registration(): void {
  const formAuthorization = document.getElementById(
    "form-registration"
  ) as HTMLFormElement;
  const divAuthorization = document.querySelector(
    ".registration"
  ) as HTMLDivElement;

  const apiRegistration = async (
    email: string,
    password: string
  ): Promise<IRegistration | null> => {
    try {
      const response = await fetch(
        "http://localhost:4448/api/user/registration",
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

      const data: IRegistration = await response.json();
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
      message.textContent = "Введите email и пароль";
      message.style.color = "red";
      divAuthorization.append(message);
      return;
    }

    const result = await apiRegistration(email, password);

    if (!result || result.message !== "Вы успешно зарегистрировались") {
      message.textContent = "Email уже занят";
      message.style.color = "red";
      divAuthorization.append(message);
      return;
    }

    message.textContent = "Вы успешно зарегистрировались";
    message.style.color = "green";
    divAuthorization.append(message);

    setTimeout((): void => {
      window.location.href = "../index.html";
    }, 2000);
  });
}
