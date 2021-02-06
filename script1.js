let body = document.querySelector('body')
let testBody = document.querySelector('.test-body')
let templateCard = document.querySelector('#card-template').content
let card = templateCard.querySelector('.card')
let button = document.querySelector('.button')
let resultStore = {}
let showResultButton = document.querySelector('.show-result-button');

// Список вопросов
let questions = {
  Question1: 'Сколько океанов омывают нашу планету?',
  Question2: 'В каком году была разрушена Берлинская стена?',
  Question3: 'Назовите страну с наибольшим количеством границ',
  Question4: 'Кто автор Робинзона Крузо?',
  Question5: 'Где образуется желчь?',
  Question6: 'Кто спит с открытыми глазами?',
  Question7: 'Какие часы показывают время только 2 раза в сутки?',
  Question8: 'Что теряют космонавты во время полета',
  Question9: 'Сколько прабабушек может быть у человека?',
  Question10: 'Что такое виадук?',
}
// Варианты ответов
let answers = {
  Answers1: ['7', '4', '5', '6'],
  Answers2: ['1992', '1989', '1986', '1987'],
  Answers3: ['Китай', 'Россия', 'Канада', 'Монголия'],
  Answers4: ['Жюль Верн', 'Даниэль Дэфо', 'Джек Лондон', 'Александр Дюма'],
  Answers5: ['Желчный пузырь', 'Поджелудочная железа', 'Печень', 'Кишечник'],
  Answers6: ['Лошадь', 'Заяц', 'Рыба', 'Воробей'],
  Answers7: ['Биг-Бен', 'Сломанные', 'Песочные', 'Солнечные'],
  Answers8: ['Сознание', 'Память', 'Сон', 'Вес'],
  Answers9: ['4', '6', '8', '10'],
  Answers10: ['Мост', 'Украшение', 'Водопад', 'Животное'],
}
// Правильные ответы
let correctAnswers = ['5', '1989', 'Китай', 'Даниэль Дэфо', 'Печень', 'Лошадь', 'Сломанные', 'Вес', '8', 'Мост']

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
