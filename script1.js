let testBody = document.querySelector('.test-body')
let templateCard = document.querySelector('#card-template').content
let card = templateCard.querySelector('.card')
let button = document.querySelector('.button')
let showResult = document.querySelector('.results')
let resultStore = {}
let showResultButton = document.querySelector('.show-result-button')

// Список вопросов
let questions = {
  Question1: 'В каком году первый человек полетел в космос?',
  Question2: 'Сколько лет длилась столетняя война?',
  Question3: 'В каком году образовался СССР?',
  Question4: 'В какой стране живут самые счастливые люди?',
  Question5: 'Какое число обозначает приставка "деци"',
  Question6: 'Назовите самую длинную реку на Земле',
  Question7: 'Сколько месяцев в году содержит 28 дней?'
}
// Варианты ответов
let answers = {
  Answers1: [1961, 1962, 1963, 1964],
  Answers2: [116, 100, 101, 105],
  Answers3: [1920, 1921, 1922, 1924],
  Answers4: ['Швеция', 'Финляндия', 'Дания', 'Норвегия'],
  Answers5: [0.01, 1, 10, 0.1],
  Answers6: ['Нил', 'Амазонка', 'Янцзы', 'Дунай'],
  Answers7: [2, 1, 12, 6]
}
// Правильные ответы
let correctAnswers = [1961, 116, 1922, 'Швеция', 0.1, 'Амазонка', 12]

// Создание карточек с вопросами
if (correctAnswers.length === Object.values(questions).length) {

  for (let i = 0; i < Object.keys(questions).length; i ++) {
    let newCard = card.cloneNode(true)
    let cardNumber = newCard.querySelector('.card-number')
    cardNumber.textContent = i + 1;
    let cardQuestion = newCard.querySelector('.card-question')
    cardQuestion.textContent = Object.values(questions)[i];
    let cardAnswer = newCard.querySelector('.card-answer')
    let cardAnswerList = cardAnswer.children

    for (let j = 0; j < cardAnswerList.length; j ++) {
      cardAnswerList[j].textContent = Object.values(answers)[i][j]
    }
    readAnswer(cardAnswerList, i)
    if (i > 0) newCard.classList.add('hidden')
    testBody.appendChild(newCard)
  }
// Функция записи результата ответа
  function readAnswer(collection, num) {
    for (let i = 0; i < collection.length; i ++) {
      collection[i].onclick = () => {
        resultStore[num] = collection[i].textContent
      }
    }
  }
// Смена карточек
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
          showResultButton.textContent = 'Показать результаты'
        }
      } else {
        alert('Сначала выберите ответ')
      }
    }
  };
} else {
  alert('Количество вопросов не соответствует количеству правльных ответов')
}
