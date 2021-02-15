let resultsPoints = document.querySelector('.results-points')

// Функция подсчета набранных баллов
function calcPoints(correctAnswers, resultStore) {
  let sum = 0;
  for (let i = 0; i < correctAnswers.length; i ++) {
    if (String(correctAnswers[i]) === Object.values(resultStore)[i]) {
      sum ++
    }
  }
  return sum;
}

// Создание таблицы для вывода результатов
let table = document.createElement('table')
let trNumbers = Object.keys(questions).length + 2

for (let i = 1; i <= trNumbers; i++) {
  let tr = document.createElement('tr')
  for (let i = 1; i <= 3; i ++) {
    let td = document.createElement('td')
    tr.append(td)
  }
  table.append(tr)
}

// Заполнение таблицы
  // Шапка таблицы
  table.rows[0].cells[0].textContent = 'Список вопросов:'
  table.rows[0].cells[1].textContent = 'Правильные ответы:'
  table.rows[0].cells[2].textContent = 'Ваши ответы:'

  // Список вопросов
  for (let i = 1; i < table.rows.length; i ++) {
    table.rows[i].cells[0].textContent = Object.values(questions)[i - 1]
  }

  // Список правильных ответов
  for (let i = 1; i < table.rows.length; i ++) {
    let tdBasic = table.rows[i].cells[1]
    tdBasic.textContent = correctAnswers[i - 1]
    tdBasic.style.textAlign = 'center'
  }

  // Подвал таблицы для подсчета очков
  let index = table.rows.length - 1
  table.rows[index].cells[1].textContent = 'Результат теста:'
  table.rows[index].cells[1].style.fontWeight = 'bold'
  table.rows[index].cells[1].style.background = '#FFC524'
  table.rows[index].cells[0].style.border = '1px solid transparent'
  table.rows[index].cells[2].style.textAlign = 'center'

body.append(table)
table.classList.add('hidden')

// Вывод результатов
showResultButton.addEventListener('pointerdown', () => {
  let points = calcPoints(correctAnswers, resultStore)
  showResultButton.classList.add('hidden')

  for (let i = 1; i <= Object.values(resultStore).length; i ++) {
    let tdUser = table.rows[i].cells[2]
    let tdBasic = table.rows[i].cells[1]
    tdUser.textContent = Object.values(resultStore)[i - 1]
    tdUser.style.textAlign = 'center'
    if (tdUser.textContent === tdBasic.textContent) {
      tdUser.style.background = '#5FC900'
    } else {
      tdUser.style.background = '#D63211'
    }
  }
  table.rows[index].cells[2].textContent = `${points}/${Object.values(questions).length}`

  let maxPoints = Object.values(questions).length
  let tdResult = table.rows[index].cells[2]
  if (points <= maxPoints && points >= maxPoints * 0.8) tdResult.style.background = '#5FC900';
  if (points < maxPoints * 0.8 && points >= maxPoints * 0.6) tdResult.style.background = '#FFC524';
  if (points < maxPoints * 0.6) tdResult.style.background = '#D63211';
  tdResult.style.fontWeight = '700'

  table.classList.remove('hidden')
})
