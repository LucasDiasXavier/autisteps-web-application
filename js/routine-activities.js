import { rotina, estado, deletarAtividade, salvarRotina } from './routine-data.js';
import { updateProgress } from './routine-progress.js';

export function renderActivities() {
  const activityList = document.getElementById('activityList');
  if (!activityList) return;

  const atividades = rotina[estado.periodoAtual];
  activityList.innerHTML = '';

  const proximoIndex = atividades.findIndex(a => !a.done);

  atividades.forEach((atividade, index) => {
    const isDone = atividade.done;
    const isCurrent = index === proximoIndex;
    const isLocked = proximoIndex !== -1 && index > proximoIndex;

    const li = document.createElement('li');
    li.className = 'activity-card'
      + (isDone ? ' done' : '')
      + (isCurrent ? ' current' : '')
      + (isLocked ? ' locked' : '');

    const botaoCheck = isLocked
      ? `<span class="lock-icon" aria-hidden="true">🔒</span>`
      : `<button class="check-btn" aria-pressed="${isDone}" aria-label="Marcar '${atividade.name}' como ${isDone ? 'não concluída' : 'concluída'}">${isDone ? '<i class="fa-solid fa-check" aria-hidden="true"></i>' : ''}</button>`;

    // Só tarefas criadas pelo usuário (custom) podem ser excluídas
    const botaoDelete = atividade.custom
      ? `<button class="delete-btn" aria-label="Excluir '${atividade.name}'">
           <i class="fa-solid fa-trash" aria-hidden="true"></i>
         </button>`
      : '';

    li.innerHTML = `
      <span class="activity-icon" aria-hidden="true">${atividade.icon}</span>
      <span class="activity-name">${atividade.name}</span>
      ${isCurrent ? '<span class="current-tag">Agora</span>' : ''}
      ${botaoCheck}
      ${botaoDelete}
    `;

    if (isLocked) {
      li.setAttribute('aria-disabled', 'true');
      li.title = 'Complete a atividade anterior primeiro';
    } else {
      li.querySelector('.check-btn').addEventListener('click', () => {
        if (isDone) {
          const ultimaConcluida = [...atividades].reverse().find(a => a.done);
          if (atividade !== ultimaConcluida) return;
        }
        atividade.done = !atividade.done;
        salvarRotina();
        renderActivities();
        updateProgress();
      });
    }

    // O listener do delete só é criado se o botão existe no DOM
    const deleteBtn = li.querySelector('.delete-btn');
    if (deleteBtn) {
      deleteBtn.addEventListener('click', () => {
        Swal.fire({
          title: 'Excluir atividade?',
          text: `"${atividade.name}" será removida da rotina.`,
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Excluir',
          cancelButtonText: 'Cancelar',
          confirmButtonColor: '#d33',
        }).then((result) => {
          if (result.isConfirmed) {
            deletarAtividade(estado.periodoAtual, index);
            renderActivities();
            updateProgress();
          }
        });
      });
    }

    activityList.appendChild(li);
  });
}