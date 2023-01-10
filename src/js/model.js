import { getJSON, randomiseArray, generateURL } from "./helpers.js";

export const state = {
  questionArr: [],
  questionObj: {},
  settings: {},
  index: 0,
};

const createQuestionObject = function (index) {
  const questionObj = state.questionArr[index];
  return {
    category: questionObj.category,
    type: questionObj.type,
    difficulty: questionObj.difficulty,
    question: questionObj.question,
    correctAnswer: questionObj.correct_answer,
    incorrectAnswers: questionObj.incorrect_answers,
    shuffledAnswers: randomiseArray([
      ...questionObj.incorrect_answers,
      questionObj.correct_answer,
    ]),
  };
};

export const loadQuizQuestions = async function (query) {
  try {
    state.index = 0;
    const data = await getJSON(query);
    state.questionArr = data.results;
    state.questionObj = createQuestionObject(state.index);
  } catch (err) {
    console.error(err);
  }
};

export const generateQuestion = function () {
  state.questionObj = createQuestionObject(state.index);
  // console.log(state.questionObj);
  state.index++;
};

//+state.settings.amount.split("=")[1]
