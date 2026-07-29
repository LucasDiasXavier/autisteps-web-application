import { rotina, getPeriodoAtual, renderActivities, updateProgress } from './routine.js';

function adicionarTarefaNaLista(titulo, descricao) {
  const periodoAtual = getPeriodoAtual(); // sempre pega o período certo, mesmo após trocar de aba

  rotina[periodoAtual].push({
    icon: '📝',       // ícone padrão para tarefas criadas pelo usuário
    name: titulo,
    done: false,
    // description: descricao,
    // ⚠️ o renderActivities() atual não exibe "description" no card.
    // Se quiser mostrar a descrição, é preciso adicionar isso no template
    // do <li> dentro de renderActivities() (no rotina.js).
  });

  renderActivities(); // redesenha a lista inteira, já com o mesmo estilo dos outros cards
  updateProgress();   // atualiza a barra de progresso com o novo total
}

/**
 * Módulo principal de controle do Modal (SweetAlert2)
 */
export function iniciarModal() {
  // Delegação de eventos: funciona mesmo que o botão seja
  // renderizado depois (ex: componente carregado via fetch/innerHTML)
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

        // Junta a tarefa nova com o "banco de dados" (rotina) e redesenha
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