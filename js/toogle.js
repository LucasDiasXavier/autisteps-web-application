function iniciarMenu() {
  const toggle = document.getElementById("menuToggle");
  const nav = document.getElementById("navLinks");

  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      const isOpen = nav.classList.toggle("open");

      toggle.setAttribute("aria-expanded", isOpen);
      toggle.setAttribute(
        "aria-label",
        isOpen ? "Fechar menu" : "Abrir menu"
      );
    });
  }

    const navItems = document.querySelectorAll(".nav-item");

  navItems.forEach((item) => {
    item.addEventListener("click", function (event) {
      event.preventDefault();

      navItems.forEach((navItem) => {
        navItem.classList.remove("active");
        navItem.removeAttribute("aria-current");
      });

      this.classList.add("active");
      this.setAttribute("aria-current", "page");
    });
  });
  
}