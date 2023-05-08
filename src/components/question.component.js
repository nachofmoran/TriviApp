import { LitElement, html } from "lit";
import { GetQuestionUseCase } from "../usecases/get-question.usecase";
import { state } from "../valtio/valtio";
import { decodeQuestion } from "../utils/utils";

export class QuestionComponent extends LitElement {
  static get properties() {
    return {
      round: { type: Object },
      elements: { type: Array },
      loading: { type: Boolean },
      buttonSubmit: { type: Array },
    };
  }

  async connectedCallback() {
    super.connectedCallback();
    this.loading = true;
    this.round = decodeQuestion(await GetQuestionUseCase.execute());
    this.loading = false;
    this.addEventListener("submit", this.answerButton);
    this.elements = this.getElementsByClassName("question__answer");
    this.buttonSubmit = this.getElementsByClassName("question__submit");
  }

  render() {
    return html`
      <p class="game__score">Score: ${state.count}</p>
      ${this.loading
        ? html`<h2 class="question__loading">Loading question...</h2>`
        : html`
            <article class="question">
              <p class="question__title">${this.round?.question}</p>
              <form class="question__radio">
                ${this.round?.answers.map(
                  (answer, index) => html`<input
                      id="answer${index}"
                      type="radio"
                      name="answer"
                      class="question__answer"
                      value="${answer.correct}"
                      @change="${this.enableSubmit}"
                    />
                    <label class="question__answer__label" for="answer${index}"
                      >${answer.data}</label
                    ><br />`
                )}
                <input
                  type="submit"
                  id="answer-btn"
                  class="question__submit"
                  value="Answer"
                  disabled
                />
              </form>
            </article>
          `}
    `;
  }

  getRadioValue() {
    for (let i = 0; i < this.elements.length; i++) {
      if (this.elements[i].checked) {
        return this.elements[i].value;
      }
    }
  }

  async answerButton(e) {
    e.preventDefault();
    if (this.getRadioValue() === "true") {
      state.count++;
      this.loading = true;
      this.round = decodeQuestion(await GetQuestionUseCase.execute());
      this.loading = false;
    } else {
      for (let i = 0; i < this.elements.length; i++) {
        if (this.elements[i].value === "true") {
          const selector = "label[for=" + this.elements[i].id + "]";
          const label = document.querySelector(selector);
          label.classList.add("question__answer--correct");
        }
      }
      await this.delay(1000);

      const message = new CustomEvent("game-over", {
        bubbles: true,
      });
      this.dispatchEvent(message);
    }
    for (let i = 0; i < this.elements.length; i++) {
      this.elements[i].checked = false;
    }
  }

  delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  enableSubmit() {
    this.buttonSubmit[0].disabled = false;
  }

  createRenderRoot() {
    return this;
  }
}

customElements.define("question-round", QuestionComponent);
