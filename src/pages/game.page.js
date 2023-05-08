import { LitElement, html } from "lit";
import { QuestionComponent } from "../components/question.component";
import { GameOverComponent } from "../components/game-over.component";
import { state } from "../valtio/valtio";

export class GamePage extends LitElement {
  static get properties() {
    return {
      gameOver: { type: Boolean },
    };
  }

  async connectedCallback() {
    super.connectedCallback();
    this.gameOver = false;
    state.count = 0;
    this.addEventListener("game-over", (e) => this.gameOverEvent(e));
  }

  render() {
    return html`
      <section class="game">
        ${this.gameOver
          ? html`<game-over></game-over>`
          : html` <question-round></question-round> `}
      </section>
    `;
  }

  gameOverEvent(e) {
    this.gameOver = true;
  }

  createRenderRoot() {
    return this;
  }
}

customElements.define("game-page", GamePage);
