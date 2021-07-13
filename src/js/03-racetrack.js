import '../css/common.css';

const horses = [
  'Secretariat',
  'Eclipse',
  'West Australian',
  'Flying Fox',
  'Seabiscuit',
];

let raceCounter = 0;
const refs = {
  startBtn: document.querySelector('.js-start-race'),
  winnerField: document.querySelector('.js-winner'),
  progressField: document.querySelector('.js-progress'),
  tableBody: document.querySelector('.js-results-table > tbody'),
}

refs.startBtn.addEventListener('click', onStart)

function onStart() {
  raceCounter += 1;
  const promises = horses.map(run);

  updateWinnerField('');
  updateProgresField('🤖 Заезд начался, ставки не принимаются!');
  determineWinner(promises);
  wateForAll(promises);
}

function determineWinner(horserP) {
 Promise.race(horserP).then(({ horse, time }) => {
    updateWinnerField(`🎉 Победил ${horse}, финишировав за ${time} времени`);
    updateResultsTable({ horse, time, raceCounter });
  });
}

function wateForAll(horsesP) {
  Promise.all(horsesP).then(() => {
    updateProgresField('📝 Заезд окончен, принимаются ставки.');
  });
}

function updateWinnerField(message) {
  refs.winnerField.textContent = message;
}

function updateProgresField(message) {
  refs.progressField.textContent = message;
}

function updateResultsTable({ horse, time, raceCounter }) {
  const tr = `<tr><td>${raceCounter}</td><td>${horse}</td><td>${time}</td></tr>`;
  refs.tableBody.insertAdjacentHTML('beforeend', tr);
}


/*
 * Promise.race([]) для ожидания первого выполнившегося промиса
 */
/*
 * Promise.all([]) для ожидания всех промисов
 */
function run(horse) {
  return new Promise((resolve, reject) => {
    const time = getRandomTime(2000, 3500);

    setTimeout(() => {
      resolve({ horse, time });
    }, time);
  });
}

function getRandomTime(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}