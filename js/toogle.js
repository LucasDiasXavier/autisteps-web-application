    const toggle = document.getElementById('menuToggle');
    const nav = document.getElementById('navLinks');

   toggle.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', isOpen);
      toggle.setAttribute('aria-label', isOpen ? 'Fechar menu' : 'Abrir menu');
});

document.addEventListener('DOMContentLoaded', function () {
  const navItems = document.querySelectorAll('.nav-item');

  navItems.forEach((item) => {
    item.addEventListener('click', function (event) {
      event.preventDefault();

      // Remove a classe e o atributo de todos os itens
      navItems.forEach((nav) => {
        nav.classList.remove('active');
        nav.removeAttribute('aria-current');
      });

      // Adiciona a classe e o atributo apenas no item clicado
      this.classList.add('active');
      this.setAttribute('aria-current', 'page');
    });
  });
});