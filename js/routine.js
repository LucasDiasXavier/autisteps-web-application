const rotina = {
  manha: [
    { icon: '🦷', name: 'Escovar os dentes', done: false },
    { icon: '👕', name: 'Se vestir', done: false },
    { icon: '🍞', name: 'Tomar café da manhã', done: false },
    { icon: '🎒', name: 'Arrumar a mochila', done: false },
  ],
  tarde: [
    { icon: '🍽️', name: 'Almoçar', done: false },
    { icon: '📚', name: 'Fazer a tarefa', done: false },
    { icon: '🎨', name: 'Atividade livre', done: false },
  ],
  noite: [
    { icon: '🛁', name: 'Tomar banho', done: false },
    { icon: '🍲', name: 'Jantar', done: false },
    { icon: '📖', name: 'Ler uma história', done: false },
    { icon: '🛏️', name: 'Dormir', done: false },
  ],
};

const periodLabels = { manha: 'da manhã', tarde: 'da tarde', noite: 'da noite' };
let periodoAtual = 'manha';

// Desenha a lista de atividades do período atual.
// Regra de ordem: só a próxima atividade pendente pode ser marcada;
// as que vêm depois ficam bloqueadas (cadeado) até chegar a vez delas.
function renderActivities() {
  const activityList = document.getElementById('activityList');
  if (!activityList) return; // componente ainda não está no DOM

  const atividades = rotina[periodoAtual];
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

    const botao = isLocked
      ? `<span class="lock-icon" aria-hidden="true">🔒</span>`
      : `<button class="check-btn" aria-pressed="${isDone}" aria-label="Marcar '${atividade.name}' como ${isDone ? 'não concluída' : 'concluída'}">${isDone ? '<i class="fa-solid fa-check" aria-hidden="true"></i>' : ''}</button>`;

    li.innerHTML = `
      <span class="activity-icon" aria-hidden="true">${atividade.icon}</span>
      <span class="activity-name">${atividade.name}</span>
      ${isCurrent ? '<span class="current-tag">Agora</span>' : ''}
      ${botao}
    `;

    if (isLocked) {
      li.setAttribute('aria-disabled', 'true');
      li.title = 'Complete a atividade anterior primeiro';
    } else {
      li.querySelector('.check-btn').addEventListener('click', () => {
        // Só permite desmarcar a ÚLTIMA concluída, pra não abrir brecha
        // de desfazer no meio da sequência e embaralhar a ordem.
        if (isDone) {
          const ultimaConcluida = [...atividades].reverse().find(a => a.done);
          if (atividade !== ultimaConcluida) return;
        }
        atividade.done = !atividade.done;
        renderActivities();
        updateProgress();
      });
    }

    activityList.appendChild(li);
  });
}

// Atualiza a barra de progresso e o texto ("X de Y") do período atual.
function updateProgress() {
  const progressFill = document.getElementById('progressFill');
  const progressText = document.getElementById('progressText');
  const progressLabel = document.querySelector('.progress-label span:first-child');
  if (!progressFill) return; // componente ainda não está no DOM

  const atividades = rotina[periodoAtual];
  const total = atividades.length;
  const concluidas = atividades.filter(a => a.done).length;
  const percentual = total === 0 ? 0 : Math.round((concluidas / total) * 100);

  progressFill.style.width = percentual + '%';
  progressText.textContent = `${concluidas} de ${total}`;
  progressLabel.textContent = `Progresso ${periodLabels[periodoAtual]}`;
}

// Liga os eventos de clique nas abas e faz a primeira renderização.
// Chamar isso só depois que tabs-component, progress-component e
// activities-component já foram injetados no DOM.
function iniciarRotina() {
  const tabs = document.querySelectorAll('.period-tab');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.setAttribute('aria-selected', 'false'));
      tab.setAttribute('aria-selected', 'true');
      periodoAtual = tab.dataset.period;
      renderActivities();
      updateProgress();
    });
  });

  renderActivities();
  updateProgress();
}