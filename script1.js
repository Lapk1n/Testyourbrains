let testBody = document.querySelector('.test-body')
let templateCard = document.querySelector('#card-template').content
let card = templateCard.querySelector('.card')
let button = document.querySelector('.button')
let showResult = document.querySelector('.results')
let resultStore = {}
let showResultButton = document.querySelector('.show-result-button')

let questions = {
  Question1: 'В каком году человек оказался в космосе?',
  Question2: 'Сколько лет длилась столетняя война?',
  Question3: 'Сколько будет два плюс два?',
  Question4: 'Сколько часов в сутках?',
  Question5: 'Сколько можно это терпеть?',
  Question6: 'Где живет Путин?',
  Question7: 'Сколько кубков ЛЧ взял Реал с Зиданом?'
}
let answers = {
  Answers1: [1961, 1962, 1963, 1964],
  Answers2: [99, 100, 101, 110],
  Answers3: [10, 2, 32, 4],
  Answers4: [23, 24, 25, 17],
  Answers5: ['Всю жизнь', 'Что это?', 'Это последний вопрос?', 'Нисколько'],
  Answers6: ['Во дворце', 'В хрущевке', 'Кто это', 'Свободу Навальному!'],
  Answers7: ['3', '2', 'Пута Барса!', 'Я вообще за МЮ']
}
let correctAnswers = [1961, 100, 4, 24, 'Нисколько', 'Во дворце', '3']

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

  function readAnswer(collection, num) {
    for (let i = 0; i < collection.length; i ++) {
      collection[i].addEventListener('click', () => {
        resultStore[num] = collection[i].textContent
      })
    }
  }

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
