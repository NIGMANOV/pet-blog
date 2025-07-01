export default function authorization() {
    const formAuthorization = document.getElementById("form-authorization");
    const divAuthorization = document.querySelector(".authorization");
    formAuthorization === null || formAuthorization === void 0 ? void 0 : formAuthorization.addEventListener("submit", (e) => {
        e.preventDefault();
        const emailElement = document.getElementById("form-email");
        const passwordElement = document.getElementById("form-password");
        if (!emailElement || !passwordElement)
            return;
        const email = emailElement.value;
        const password = passwordElement.value;
        const message = document.createElement("p");
        const existing = divAuthorization === null || divAuthorization === void 0 ? void 0 : divAuthorization.querySelector("p");
        if (existing)
            existing.remove();
        if (email !== "admin@gmail.com" || password !== "admin") {
            message.textContent = "Неверный логин или пароль";
            message.style.color = "red";
            divAuthorization === null || divAuthorization === void 0 ? void 0 : divAuthorization.append(message);
            return;
        }
        message.textContent = "Вы успешно авторизовались";
        message.style.color = "green";
        divAuthorization === null || divAuthorization === void 0 ? void 0 : divAuthorization.append(message);
        setTimeout(() => {
            window.location.href = "../pages/main.html";
        }, 2000);
    });
}
