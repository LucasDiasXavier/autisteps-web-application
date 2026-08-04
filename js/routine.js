// 

export { getPeriodoAtual } from './routine-data.js';

import { renderActivities } from './routine-activities.js';
import { updateProgress } from './routine-progress.js';
import { iniciarTabs } from './routine-tabs.js';

export function iniciarRotina() {
  iniciarTabs();
  renderActivities();
  updateProgress();
}