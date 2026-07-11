    const toggle = document.getElementById('menuToggle');
    const nav = document.getElementById('navLinks');

   toggle.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', isOpen);
      toggle.setAttribute('aria-label', isOpen ? 'Fechar menu' : 'Abrir menu');
});