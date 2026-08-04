// 

const STORAGE_KEY = 'autisteps-rotina';

const rotinaPadrao = {
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

// Tenta recuperar do localStorage; se não existir ou estiver corrompido,
// cai para os dados padrão.
function carregarRotina() {
  const salvo = localStorage.getItem(STORAGE_KEY);
  if (!salvo) return structuredClone(rotinaPadrao);

  try {
    return JSON.parse(salvo);
  } catch (erro) {
    console.warn('Rotina salva estava corrompida, usando padrão:', erro);
    return structuredClone(rotinaPadrao);
  }
}

export const rotina = carregarRotina();

// Chame isso sempre que "rotina" for alterado (adicionar, concluir, excluir).
export function salvarRotina() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(rotina));
}

export const periodLabels = { manha: 'da manhã', tarde: 'da tarde', noite: 'da noite' };

 export const estado = {
  periodoAtual: 'manha',
};

export function getPeriodoAtual() {
  return estado.periodoAtual;
}

// Remove uma atividade pelo índice dentro do período informado.
export function deletarAtividade(periodo, index) {
  rotina[periodo].splice(index, 1);
  salvarRotina();
}