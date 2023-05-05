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
    console.log("data: ", data);

    expect(data.answers[2].data).toBe(QUESTION.correct_answer);
  });
});
