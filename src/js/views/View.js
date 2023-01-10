class View {
  _data;
  _index = 0;
  _score = 0;
  _parentElement = document.querySelector(".form_container");

  _numberOfQuestions = document.querySelector("#trivia_amount");
  _category = document.querySelector("#trivia_category");
  _difficulty = document.querySelector("#trivia_difficulty");

  getTriviaSettings() {
    this._index = this._numberOfQuestions.value;
    return {
      amount: `amount=${this._numberOfQuestions.value}`,
      category:
        this._category.value === "any"
          ? ""
          : `category=${this._category.value}`,
      difficulty:
        this._difficulty.value === "any"
          ? ""
          : `difficulty=${this._difficulty.value}`,
    };
  }

  addHandlerSubmitSettings(handler) {
    this._parentElement.addEventListener(
      "submit",
      function (e) {
        e.preventDefault();
        handler();
      },
      { once: true }
    );
  }

  addHandlerNext(handler, data, index) {
    const triviaOptions = document.querySelectorAll(".trivia_option");

    triviaOptions.forEach((option) =>
      option.addEventListener(
        "click",
        function () {
          if (index !== +this._index) {
            this.checkAnswer(data, option.innerHTML);
            setTimeout(function () {
              handler();
            }, 3000),
              { once: true };
          } else {
            this.checkAnswer(data, option.innerHTML);
            setTimeout(this.renderFinalScreen.bind(this), 3000);
          }
        }.bind(this)
      )
    );
  }

  _clear() {
    this._parentElement.innerHTML = "";
  }

  renderQuestion(data) {
    this._data = data;
    if (!data) return;

    this._clear();
    const markup = this._generateQuestion();
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }

  renderFinalScreen() {
    this._clear();
    const markup = this._generateFinal();
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }

  _generateQuestion() {
    return `
    <h2 class="form_header">${this._data.question}</h2>
    ${this._data.shuffledAnswers
      .map(
        (_, i) =>
          `<p class="trivia_option">${this._data.shuffledAnswers[i]}</p>`
      )
      .join("")}
    <p class="score">Your current score: ${this._score}</p>
    `;
  }

  _generateAnswer(answerCorrect) {
    if (answerCorrect)
      return `<div class="trivia_answer">Correct! The answer is ${this._data.correctAnswer}</div>`;
    else
      return `<div class="trivia_answer">Incorrect! The correct answer is ${this._data.correctAnswer}</div>`;
  }

  _generateFinal() {
    return `
    <h1 class="trivia_end">The End! </br>Your final score is ${this._score}/${this._index}</h1>
    `;
  }

  checkAnswer(data, option) {
    this._data = data;
    let answerCorrect;
    const correctAnswer = this._data.correctAnswer;
    if (option === correctAnswer) {
      answerCorrect = true;
      this._score++;
    } else answerCorrect = false;
    const html = this._generateAnswer(answerCorrect);
    this._parentElement.insertAdjacentHTML("beforeend", html);
  }
}

export default new View();
