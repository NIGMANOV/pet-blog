var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export default function authorization() {
    const formAuthorization = document.getElementById("form-authorization");
    const divAuthorization = document.querySelector(".authorization");
    const apiAuthorization = (email, password) => __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch("http://localhost:4448/api/user/authorization", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });
            if (!response.ok) {
                throw new Error(`Ошибка сервера: ${response.status}`);
            }
            const data = yield response.json();
            console.log(data);
            return data;
        }
        catch (error) {
            console.error(error);
            return null;
        }
    });
    formAuthorization === null || formAuthorization === void 0 ? void 0 : formAuthorization.addEventListener("submit", (e) => __awaiter(this, void 0, void 0, function* () {
        e.preventDefault();
        const emailElement = document.getElementById("form-email");
        const passwordElement = document.getElementById("form-password");
        const email = emailElement.value.trim();
        const password = passwordElement.value.trim();
        const message = document.createElement("p");
        const existing = divAuthorization === null || divAuthorization === void 0 ? void 0 : divAuthorization.querySelector("p");
        if (existing)
            existing.remove();
        if (!email || !password) {
            message.textContent = "Введите логин и пароль";
            message.style.color = "red";
            divAuthorization.append(message);
            return;
        }
        const result = yield apiAuthorization(email, password);
        if (!result || result.message !== "Вы успешно авторизовались") {
            message.textContent = "Неверный логин или пароль";
            message.style.color = "red";
            divAuthorization.append(message);
            return;
        }
        message.textContent = "Вы успешно авторизовались";
        message.style.color = "green";
        divAuthorization.append(message);
        setTimeout(() => {
            window.location.href = "../pages/main.html";
        }, 2000);
    }));
}
