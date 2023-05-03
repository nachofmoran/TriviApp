import { TriviaRepository } from "../repositories/trivia.repository";

export class GetLeaderboardUseCase {
  static async execute() {
    const repository = new TriviaRepository();
    const data = await repository.getLeaderboard();
    return data;
  }
}
