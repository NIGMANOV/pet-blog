import { router } from "./router";

function navigateTo(url: string) {
  history.pushState(null, "", url);
  router(url);
}

document.addEventListener("DOMContentLoaded", () => {
  router(location.pathname);

  document.body.addEventListener("click", (e) => {
    const target = e.target as HTMLElement;
    if (target.matches("a[data-link]")) {
      e.preventDefault();
      const href = target.getAttribute("href")!;
      navigateTo(href);
    }
  });
});

window.addEventListener("popstate", () => {
  router(location.pathname);
});
