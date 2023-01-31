class View {
  _data;
  _index = 0;
  _score = 0;
  _quizContainer = document.querySelector(".quiz_container");
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
        // document.querySelector(".form_container").remove();
        document.querySelector(".welcome").remove();
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
            handler();
          } else {
            this.checkAnswer(data, option.innerHTML);
            this.renderFinalScreen();
          }
        }.bind(this)
      )
    );
  }

  _clear() {
    this._quizContainer.innerHTML = "";
  }

  renderQuestion(data) {
    this._data = data;
    if (!data) return;

    this._clear();
    const markup = this._generateQuestion();
    this._quizContainer.insertAdjacentHTML("afterbegin", markup);
  }

  renderFinalScreen() {
    this._clear();
    const markup = this._generateFinal();
    this._quizContainer.insertAdjacentHTML("afterbegin", markup);
  }

  _generateQuestion() {
    return `
    <h2 class="trivia_question">${this._data.question}</h2>
    <div class="question_block">
    ${this._data.shuffledAnswers
      .map(
        (_, i) =>
          `<p class="trivia_option">${this._data.shuffledAnswers[i]}</p>`
      )
      .join("")}
      </div>
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
    <form>
    <button class="button_reload">Reload</button>
    </form>
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
    const html = this._renderModal(answerCorrect);
    let body = document.querySelector("body");
    body.insertAdjacentHTML("beforeend", html);
    this._toggleModal();
  }

  _renderModal(data) {
    return `
    <div id="modal" class="modal">
      <div class="modal-content">
      ${this._generateAnswer(data)}
      </div>
    </div>`;
  }

  _toggleModal() {
    const modal = document.querySelector(".modal");
    modal.addEventListener("click", () => {
      modal.style.display = "hidden";
      modal.remove();
    });
  }
}

export default new View();
