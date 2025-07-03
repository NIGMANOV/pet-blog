import renderAuthorization from "./pages/authorization";
import renderRegistration from "./pages/registration";

export function router(path: string): void {
  switch (path) {
    case "/":
      renderAuthorization();
      break;
    case "/registration":
      renderRegistration();
      break;
    default:
      document.querySelector("#app")!.innerHTML = `
  <main class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="text-center">
      <h1 class="text-6xl font-bold text-gray-800 mb-4">404</h1>
      <p class="text-xl text-gray-600 mb-6">Страница не найдена</p>
      <a href="/" data-link
         class="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-300">
        На главную
      </a>
    </div>
  </main>
`;
  }
}
