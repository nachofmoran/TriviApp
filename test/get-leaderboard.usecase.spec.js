import { GetLeaderboardUseCase } from "../src/usecases/get-leaderboard.usecase";
import { LEADERBOARD } from "./fixtures/db-fixture";
import { TriviaRepository } from "../src/repositories/trivia.repository";

jest.mock("../src/repositories/trivia.repository");

describe("Get leaderboard use case", () => {
  beforeEach(() => {
    TriviaRepository.mockClear();
  });

  it("get leaderboard", async () => {
    TriviaRepository.mockImplementation(() => {
      return {
        getLeaderboard: () => {
          return LEADERBOARD;
        },
      };
    });

    const data = await GetLeaderboardUseCase.execute();
    expect(data.length).toBe(5);
    expect(data[1].name).toBe("Nacho");
  });
});
