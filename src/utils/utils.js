import { Question } from "../model/question";

const decodeHtml = (html) => {
  const textArea = document.createElement("textarea");
  textArea.innerHTML = html;
  return textArea.value;
};

const decodeQuestion = (round) => {
  console.log("esta entrando a decodificar");
  const question = decodeHtml(round.question);
  console.log("question decodificada", question);
  const answers = [];
  round.answers.map((item) => {
    answers.push({ data: decodeHtml(item.data), correct: item.correct });
  });

  return new Question({
    question,
    answers,
  });
};

const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
};

export { decodeHtml, shuffleArray, decodeQuestion };
