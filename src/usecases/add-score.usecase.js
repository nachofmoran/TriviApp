import { TriviaRepository } from "../repositories/trivia.repository";

export class AddScoreUseCase {
  static async execute(player, score) {
    const repository = new TriviaRepository();
    const response = await repository.addScore(player, score);
    return response;
  }
}
