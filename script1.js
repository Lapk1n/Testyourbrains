let body = document.querySelector('body')
let testBody = document.querySelector('.test-body')
let templateCard = document.querySelector('#card-template').content
let card = templateCard.querySelector('.card')
let button = document.querySelector('.button')
let resultStore = {}
let showResultButton = document.querySelector('.show-result-button');

// Список вопросов
let questions = {
  Question1: 'В каком году первый человек полетел в космос?',
  Question2: 'Сколько лет длилась столетняя война?',
  Question3: 'В каком году образовался СССР?',
  Question4: 'В какой стране живут самые счастливые люди?',
  Question5: 'Какое число обозначает приставка "деци"',
  Question6: 'Назовите самую длинную реку на Земле',
  Question7: 'Сколько месяцев в году содержит 28?'
}
// Варианты ответов
let answers = {
  Answers1: ['1961', '1962', '1963', '1964'],
  Answers2: ['116', '100', '101', '105'],
  Answers3: ['1920', '1921', '1922', '1924'],
  Answers4: ['Швеция', 'Финляндия', 'Дания', 'Норвегия'],
  Answers5: ['0.01', '1', '10', '0.1'],
  Answers6: ['Нил', 'Амазонка', 'Янцзы', 'Дунай'],
  Answers7: ['2', '1', '12', '6']
}
// Правильные ответы
let correctAnswers = ['1961', '116', '1922', 'Швеция', '0.1', 'Амазонка', '12']

// Проверка на корректность
function checkDisplaying() {
  let a = 1;
  let b = 1;
  let c = 1;
  let d = 1;
  let result = [];

  // Допустимое количество символов в вопросе (58)
  for (let question of Object.values(questions)) {
    if (question.length >= 59) {
      let index = Object.values(questions).indexOf(question) + 1
      let symbols = question.length
      alert(`В вопросе № ${index} количество символов - ${symbols}`)
      alert(`Максимальное количество символов для вопроса - не более 59`)
      a = 0
    }
  }
  result.push(a)

  // Допустимое количество символов в ответе (24)
  for (let answer of Object.values(answers)) {
    for (let subAnswer of answer) {
      if (subAnswer.length >= 25) {
        let index = Object.values(answers).indexOf(answer) + 1
        let subIndex = answer.indexOf(subAnswer) + 1
        let symbols = subAnswer.length
        alert(`В блоке ответов №${index}, ответ №${subIndex} содержит
          количество символов - ${symbols}`)
        alert(`Максимальное количество символов для овтета - не более 25`)
        b = 0
      }
    }
  }
  result.push(b)

  // Соответствие количества вопросов количеству ответов
  if (correctAnswers.length !== Object.values(questions).length) {
    alert(`Количество вопросов не соответствует количеству правильных ответов`)
    c = 0
  }
  result.push(c)

  // Недопустимость наличия пустой строки в блоке правльных овтетов
  for (let correctAnswer of correctAnswers) {
    if (!correctAnswer.length) {
      let index = correctAnswers.indexOf(correctAnswer) + 1
      alert(`В блоке правильных овтетов позиция ${index} отсутствует`)
      d = 0
    }
  }
  result.push(d)

  return result
}

// Создание карточек с вопросами
let checkDataPoints = checkDisplaying().reduce((acc, elem) => acc + elem)
if (checkDataPoints === 4) {
  for (let i = 0; i < Object.keys(questions).length; i ++) {
    let newCard = card.cloneNode(true)
    let cardNumber = newCard.querySelector('.card-number')
    cardNumber.textContent = i + 1;
    let cardQuestion = newCard.querySelector('.card-question')
    cardQuestion.textContent = Object.values(questions)[i];
    let cardAnswer = newCard.querySelector('.card-answer')
    let cardAnswerList = cardAnswer.children

    for (let j = 0; j < cardAnswerList.length; j ++) {``
      cardAnswerList[j].textContent = Object.values(answers)[i][j]
    }

    readAnswer(cardAnswerList, i)
      if (i > 0) newCard.classList.add('hidden')
      testBody.appendChild(newCard)
  }
} else {
  alert('Входные данные не прошли проверку на корректность. Программа недоступна.')
}

// Функция записи результата ответа, стилизация кликов
function readAnswer(collection, num) {
  for (let i = 0; i < collection.length; i ++) {
    collection[i].onclick = () => {
      resultStore[num] = collection[i].textContent
      for (let item of collection) {
        if (item.classList.contains('choosed')) {
          item.classList.remove('choosed')
        }
      }
      collection[i].classList.add('choosed')
    }
    collection[i].onmouseover = () => {
      collection[i].style.background = '#FFC524'
    }
    collection[i].onmouseout = () => {
      collection[i].style.background = ''
    }
    collection[i].onmousedown = () => {
      collection[i].style.background = '#5FC900'
    }
  }
}

// Смена карточек вопросов
let buttons = document.querySelectorAll('.button')
let cards = document.querySelectorAll('.card')
for (let i = 0; i < buttons.length; i ++) {
  buttons[i].onclick = () => {
    if (resultStore[i]) {
      cards[i].classList.add('hidden')
      if (cards[i + 1]) {
        cards[i + 1].classList.remove('hidden')
      } else {
        showResultButton.classList.remove('hidden')
        showResultButton.textContent = 'Подсчитать результаты'
      }
    } else {
      alert('Сначала выберите ответ')
    }
  }
}
