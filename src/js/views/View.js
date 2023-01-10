class View {
  _data;
  _index = 0;
  _parentElement = document.querySelector(".form_container");

  _numberOfQuestions = document.querySelector("#trivia_amount");
  _category = document.querySelector("#trivia_category");
  _difficulty = document.querySelector("#trivia_difficulty");
  _btn = document.querySelector(".btn_submit");
  _answer = document.querySelector(".trivia_answer");

  getTriviaSettings() {
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

  addHandlerNext(handler, data) {
    this._parentElement.addEventListener(
      "submit",
      function (e) {
        e.preventDefault();
        this.checkAnswer(data);
        setTimeout(handler, 3000);
      }.bind(this),
      { once: true }
    );
  }

  _clear() {
    this._parentElement.innerHTML = "";
  }

  renderQuestion(data) {
    this._data = data;
    if (!data) return;
    this._clear();

    const markup = this._generateMarkup();
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }

  // _generateMarkup() {
  //   return `
  //   <h2 class="form_header">${this._data.question}</h2>
  //   <input type="radio" value="${this._data.shuffledAnswers[0]}" name="trivia_option" id="option1" class="trivia_option">
  //   <label for="option1">${this._data.shuffledAnswers[0]}</label>
  //   <br/>
  //   <input type="radio" value="${this._data.shuffledAnswers[1]}" name="trivia_option" id="option2" class="trivia_option">
  //   <label for="option2">${this._data.shuffledAnswers[1]}</label>
  //   <br/>
  //   <input type="radio" value="${this._data.shuffledAnswers[2]}" name="trivia_option" id="option3" class="trivia_option">
  //   <label for="option3">${this._data.shuffledAnswers[2]}</label>
  //   <br/>
  //   <input type="radio" value="${this._data.shuffledAnswers[3]}" name="trivia_option" id="option4" class="trivia_option">
  //   <label for="option4">${this._data.shuffledAnswers[3]}</label>
  //   <br/>
  //   <button class="btn_submit" type="submit">Submit answer</button>
  //   `;
  // }

  _generateMarkup() {
    return `
    <h2 class="form_header">${this._data.question}</h2>
    ${this._data.shuffledAnswers
      .map((_, i) => `<p>${this._data.shuffledAnswers[i]}</p>`)
      .join("")}
    <button class="btn_submit" type="submit">Submit answer</button>
    `;
  }

  _generateAnswer(answerCorrect) {
    if (answerCorrect)
      return `<div class="trivia_answer">Correct! The answer is ${this._data.correctAnswer}</div>`;
    else
      return `<div class="trivia_answer">Incorrect! The correct answer is ${this._data.correctAnswer}</div>`;
  }

  checkAnswer(data) {
    this._data = data;
    let answerCorrect;
    const correctAnswer = this._data.correctAnswer;
    const radioBtnSelected = document.querySelector(
      'input[name="trivia_option"]:checked'
    ).value;
    if (radioBtnSelected === correctAnswer) {
      answerCorrect = true;
    } else answerCorrect = false;
    const html = this._generateAnswer(answerCorrect);
    this._parentElement.insertAdjacentHTML("beforeend", html);
  }
}

export default new View();
