import { TriviaRepository } from "../src/repositories/trivia.repository";
import { GetQuestionUseCase } from "../src/usecases/get-question.usecase";
import { QUESTION } from "./fixtures/question-fixture";

jest.mock("../src/repositories/trivia.repository");

describe("Get question use case", () => {
  beforeEach(() => {
    TriviaRepository.mockClear();
  });

  it("get question", async () => {
    TriviaRepository.mockImplementation(() => {
      return {
        getQuestion: () => {
          return QUESTION;
        },
      };
    });

    const data = await GetQuestionUseCase.execute();

    expect(data.question).toBe(QUESTION.question);
    expect(data.answers.length).toBe(4);
  });
});
