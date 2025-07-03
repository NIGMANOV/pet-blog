export default function home(): void {
  document.querySelector("#app")!.innerHTML = `
  <div class="min-h-screen flex flex-col bg-gray-50 text-gray-800">
    <!-- Header -->
    <header class="bg-white shadow-md px-6 py-4 flex justify-between items-center">
      <h1 class="text-xl font-semibold">Главная страница</h1>
      <button id="logout-btn"
        class="cursor-pointer bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-300">
        Выйти
      </button>
    </header>
    
    <main class="flex-grow flex items-center justify-center">
      <div class="text-center">
        <h2 class="text-3xl font-bold mb-2">Добро пожаловать!</h2>
        <p class="text-gray-600 text-lg">Вы успешно вошли в систему.</p>
      </div>
    </main>

    <footer class="bg-white border-t text-center py-4 text-sm text-gray-500">
      &copy; 2025 Все права защищены
    </footer>
  </div>
`;

const btnLogout = document.getElementById('logout-btn') as HTMLButtonElement

btnLogout.addEventListener('click', (e): void => {
    window.location.href = '/'
})
}
