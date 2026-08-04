import { estado } from './routine-data.js';
import { renderActivities } from './routine-activities.js';
import { updateProgress } from './routine-progress.js';

export function iniciarTabs() {
  const tabs = document.querySelectorAll('.period-tab');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.setAttribute('aria-selected', 'false'));
      tab.setAttribute('aria-selected', 'true');
      estado.periodoAtual = tab.dataset.period;
      renderActivities();
      updateProgress();
    });
  });
}