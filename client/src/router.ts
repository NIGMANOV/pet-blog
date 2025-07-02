import renderAuthorization from "./pages/authorization";
import renderRegistration from "./pages/registration";

export function router(path: string): void {
  switch (path) {
    case "/authorization":
      renderAuthorization();
      break;
    case "/registration":
      renderRegistration();
      break;
    default:
      document.querySelector("#app")!.innerHTML = "<h1>404 - Не найдено</h1>";
  }
}
