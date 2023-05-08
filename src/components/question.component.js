import { LitElement, html } from "lit";
import { GetQuestionUseCase } from "../usecases/get-question.usecase";
import { state } from "../valtio/valtio";
import { decodeQuestion } from "../utils/utils";
//import "../main.css";

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
    this.elements = this.getElementsByClassName("answer");
    this.buttonSubmit = this.getElementsByClassName("submit-button");
  }

  render() {
    return html`
      <h2>${state.count}</h2>
      ${this.loading
        ? html`<h2>Loading...</h2>`
        : html`
            <article>
              <p>${this.round?.question}</p>
              <form>
                ${this.round?.answers.map(
                  (answer, index) => html`<input
                      id="answer${index}"
                      type="radio"
                      name="answer"
                      class="answer"
                      value="${answer.correct}"
                      @change="${this.enableSubmit}"
                    />
                    <label for="answer${index}">${answer.data}</label><br />`
                )}
                <input
                  type="submit"
                  id="answer-btn"
                  class="submit-button"
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
          this.elements[i].classList.add("correct");
          console.log("clase añadida a: ", this.elements[i].classList);
        }
      }
      //await this.delay(500);

      const message = new CustomEvent("game-over", {
        bubbles: true,
      });
      console.log("resultado: ", this.getRadioValue());
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
    console.log("Habilitamos submit");
    this.buttonSubmit[0].disabled = false;
  }

  createRenderRoot() {
    return this;
  }
}

customElements.define("question-round", QuestionComponent);
