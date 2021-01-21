let reloadButton = document.querySelector('.reload-button')
let resultsPoints = document.querySelector('.results-points')
function calcPoints(correctAnswers, resultStore) {
  let sum = 0;
  for (let i = 0; i < correctAnswers.length; i ++) {
    if (String(correctAnswers[i]) === Object.values(resultStore)[i]) {
      sum ++
    }
  }
  return sum;
}
showResultButton.onclick = () => {
  let points = calcPoints(correctAnswers, resultStore)
  showResultButton.classList.add('hidden')
  showResult.classList.remove('hidden')
  resultsPoints.textContent = `Ваш результат: ${points}/${Object.values(questions).length}`
  reloadButton.textContent = 'Еще раз?'
}
reloadButton.onclick = () => {
  window.location.reload()
}
