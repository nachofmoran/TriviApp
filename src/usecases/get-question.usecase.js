import { TriviaRepository } from "../repositories/trivia.repository";
import { Question } from "../model/question";
import { decodeHtml, shuffleArray } from "../utils/utils";

export class GetQuestionUseCase {
  static async execute() {
    const repository = new TriviaRepository();
    const data = await repository.getQuestion();

    //const question = decodeHtml(data.question);
    const question = data.question;
    //const answers = [{ data: decodeHtml(data.correct_answer), correct: true }];
    const answers = [{ data: data.correct_answer, correct: true }];
    data.incorrect_answers.map((item) => {
      //answers.push({ data: decodeHtml(item), correct: false });
      answers.push({ data: item, correct: false });
    });
    console.log(answers);
    shuffleArray(answers);

    return new Question({
      question,
      answers,
    });
  }
}
