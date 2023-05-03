import { TriviaRepository } from "../repositories/trivia.repository";
import { Question } from "../model/question";

export class GetQuestionUseCase {
  static async execute() {
    const repository = new TriviaRepository();
    const data = await repository.getQuestion();
    return new Question({
      question: data.question,
      correctAnswer: data.correct_answer,
      incorrectAnswers: data.incorrect_answers,
    });
  }
}
