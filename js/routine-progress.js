import { rotina, estado, periodLabels } from './routine-data.js';

export function updateProgress() {
  const progressFill = document.getElementById('progressFill');
  const progressText = document.getElementById('progressText');
  const progressLabel = document.querySelector('.progress-label span:first-child');
  if (!progressFill) return;

  const atividades = rotina[estado.periodoAtual];
  const total = atividades.length;
  const concluidas = atividades.filter(a => a.done).length;
  const percentual = total === 0 ? 0 : Math.round((concluidas / total) * 100);

  progressFill.style.width = percentual + '%';
  progressText.textContent = `${concluidas} de ${total}`;
  progressLabel.textContent = `Progresso ${periodLabels[estado.periodoAtual]}`;
}