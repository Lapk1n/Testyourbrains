let testBody = document.querySelector('.test-body')
let templateCard = document.querySelector('#card-template').content
let card = templateCard.querySelector('.card')
let button = document.querySelector('.button')
let showResult = document.querySelector('.results')
let resultStore = {}
let showResultButton = document.querySelector('.show-result-button')

let questions = {
  1: 'Сколько пальцев на руке?',
  2: 'Сколько лап у пауков?',
  3: 'Сколько будет два плюс два?',
  4: 'Сколько часов в сутках?',
  5: 'Сколько можно это терпеть?'
}
let answers = {
  Question1: [1, 2, 30, 4],
  Question2: [4, 6, 8, 10],
  Question3: [10, 2, 32, 4],
  Question4: [23, 24, 25, 17],
  Question5: ['всю жизнь', 'что это?', 'хватит терпеть', 'это последний вопрос?']
}
let correctAnswers = [4, 8, 4, 24, 'хватит терпеть']

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
