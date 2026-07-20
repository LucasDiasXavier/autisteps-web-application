async function loadComponent(id, file) {
  const response = await fetch(file);
  const html = await response.text();

  document.getElementById(id).innerHTML = html;
}

document.addEventListener("DOMContentLoaded", async () => {

  await loadComponent(
    "header-component",
    "./components/header.html"
  );

  const navigationContainer =
    document.getElementById("navigation-component");

  if (navigationContainer) {
    const response = await fetch(
      "./components/navigation.html"
    );

    navigationContainer.innerHTML =
      await response.text();
  }

  await loadComponent(
    "tabs-component",
    "./components/tabs.html"
  );

  iniciarMenu();
});