import { LitElement, html } from "lit";
import { GetQuestionUseCase } from "../usecases/get-question.usecase";
import { state } from "../valtio/valtio";
import { snapshot } from "valtio";

export class QuestionComponent extends LitElement {
  static get properties() {
    return {
      round: { type: Object },
      elements: { type: Array },
      loading: { type: Boolean },
      snap: { type: Object },
      unsubscribe: { type: Function },
    };
  }

  async connectedCallback() {
    super.connectedCallback();
    this.snap = snapshot(state);
    this.loading = true;
    this.round = await GetQuestionUseCase.execute();
    this.loading = false;
    this.addEventListener("submit", this.answerButton);
    this.elements = this.getElementsByClassName("answer");
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
                    />
                    <label for="answer${index}">${answer.data}</label><br />`
                )}
                <input type="submit" id="answer-btn" value="Answer" />
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
    let eventType = "";
    if (this.getRadioValue() === "true") {
      eventType = "win";
      state.count++;
      console.log("score", state.count);
      this.loading = true;
      this.round = await GetQuestionUseCase.execute();
      this.loading = false;
    } else {
      eventType = "game-over";
    }

    const message = new CustomEvent(eventType, {
      bubbles: true,
    });
    console.log("resultado: ", this.getRadioValue());
    this.dispatchEvent(message);
    for (let i = 0; i < this.elements.length; i++) {
      this.elements[i].checked = false;
    }
  }

  createRenderRoot() {
    return this;
  }
}

customElements.define("question-round", QuestionComponent);
