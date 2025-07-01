export default function authorization(): void {
  const formAuthorization = document.getElementById(
    "form-authorization"
  ) as HTMLFormElement | null;
  const divAuthorization = document.querySelector(
    ".authorization"
  ) as HTMLDivElement | null;

  formAuthorization?.addEventListener("submit", (e): void => {
    e.preventDefault();

    const emailElement = document.getElementById(
      "form-email"
    ) as HTMLInputElement | null;
    const passwordElement = document.getElementById(
      "form-password"
    ) as HTMLInputElement | null;

    if (!emailElement || !passwordElement) return;

    const email: string = emailElement.value;
    const password: string = passwordElement.value;

    const message = document.createElement("p");
    const existing = divAuthorization?.querySelector("p");
    if (existing) existing.remove();

    if (email !== "admin@gmail.com" || password !== "admin") {
      message.textContent = "Неверный логин или пароль";
      message.style.color = "red";
      divAuthorization?.append(message);
      return;
    }

    message.textContent = "Вы успешно авторизовались";
    message.style.color = "green";
    divAuthorization?.append(message);

    setTimeout((): void => {
      window.location.href = "../pages/main.html";
    }, 2000);
  });
}
