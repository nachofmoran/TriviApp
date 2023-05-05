import { TriviaRepository } from "../repositories/trivia.repository";

export class AddScoreUseCase {
  //static async execute(leaderboard, player, score) {
  static async execute(player, score) {
    const repository = new TriviaRepository();
    await repository.addScore(player, score);
    //return [...leaderboard, { name: player, score }];
    return { name: player, score };
  }
}
