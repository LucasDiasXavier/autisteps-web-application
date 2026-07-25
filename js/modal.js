// modal.js

/**
 * Função responsável por criar o card da tarefa no DOM
 * com a estrutura e classes idênticas aos cards fictícios.
 */
function adicionarTarefaNaLista(titulo, descricao) {
  const activityList = document.getElementById("activityList");

  if (!activityList) {
    console.error("Elemento '#activityList' não foi encontrado na página.");
    return;
  }

  // 1. Cria o item da lista (<li>) principal
  const li = document.createElement("li");
  li.classList.add("activity-item");

  // 2. Estrutura de classes compatível com a estilização dos seus cards
  li.innerHTML = `
    <div class="activity-content">
      <h3 class="activity-title">${titulo}</h3>
      ${descricao ? `<p class="activity-description">${descricao}</p>` : ''}
    </div>
    <div class="activity-actions">
      <button class="delete-btn" type="button" aria-label="Excluir tarefa">
        <i class="fa-solid fa-trash" aria-hidden="true"></i>
      </button>
    </div>
  `;

  // 3. Associa o evento de remoção à lixeira do novo card
  const deleteBtn = li.querySelector(".delete-btn");
  if (deleteBtn) {
    deleteBtn.addEventListener("click", () => {
      li.remove();
    });
  }

  // 4. Insere a nova tarefa no topo da <ul id="activityList"> junto com os cards existentes
  activityList.prepend(li);
}

/**
 * Módulo principal de controle do Modal (SweetAlert2)
 */
export function iniciarModal() {
  // Delegação de eventos: funciona perfeitamente independente de renderização assíncrona
  document.addEventListener("click", (event) => {
    const btn = event.target.closest("#addTaskBtn");

    if (!btn) return; // Se o clique não foi no botão de adicionar, ignora

    Swal.fire({
      title: 'Nova Tarefa',
      html: `
        <div style="display: flex; flex-direction: column; gap: 12px; text-align: left;">
          <label for="swal-input-title" style="font-weight: bold; font-size: 14px;">Título:</label>
          <input id="swal-input-title" class="swal2-input" style="margin: 0;" placeholder="Digite o título da tarefa">
          
          <label for="swal-input-desc" style="font-weight: bold; font-size: 14px;">Descrição:</label>
          <textarea id="swal-input-desc" class="swal2-textarea" style="margin: 0; resize: vertical;" placeholder="Detalhes da tarefa..."></textarea>
        </div>
      `,
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonText: 'Salvar Tarefa',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      preConfirm: () => {
        const title = document.getElementById('swal-input-title').value;
        const desc = document.getElementById('swal-input-desc').value;

        if (!title.trim()) {
          Swal.showValidationMessage('Por favor, insira o título da tarefa!');
          return false;
        }

        return { title, desc };
      }
    }).then((result) => {
      if (result.isConfirmed) {
        const { title, desc } = result.value;

        // Renderiza e insere a tarefa junto com as fictícias na <ul id="activityList">
        adicionarTarefaNaLista(title, desc);

        // Feedback de confirmação rápida
        Swal.fire({
          icon: 'success',
          title: 'Tarefa criada!',
          timer: 1500,
          showConfirmButton: false
        });
      }
    });
  });
}