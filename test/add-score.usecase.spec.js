import { AddScoreUseCase } from "../src/usecases/add-score.usecase";
import { LEADERBOARD } from "./fixtures/db-fixture";
import { TriviaRepository } from "../src/repositories/trivia.repository";

jest.mock("../src/repositories/trivia.repository");

describe("Add score use case", () => {
  beforeEach(() => {
    TriviaRepository.mockClear();
  });

  it("add score", async () => {
    TriviaRepository.mockImplementation(() => {
      return {
        addScore: () => {
          return { id: "2HkbBpQ1jrGBuMcpB3jE" };
        },
      };
    });

    const data = await AddScoreUseCase.execute("Lorena", 7);
    expect(data.id).toBeDefined();
  });
});
