import * as model from "./model.js";
import View from "./views/View.js";
import { generateURL } from "./helpers.js";

const controlTriviaDataLoad = async function () {
  const settings = View.getTriviaSettings();
  model.state.settings = settings;
  const query = generateURL(settings);

  await model.loadQuizQuestions(query);
  controlQuestion();
};

const controlQuestion = function () {
  model.generateQuestion();
  View.renderQuestion(model.state.questionObj);
  View.addHandlerNext(controlQuestion, model.state.questionObj);
};

const init = function () {
  View.addHandlerSubmitSettings(controlTriviaDataLoad);
};

init();
