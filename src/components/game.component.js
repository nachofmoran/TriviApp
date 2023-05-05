import { LitElement, html } from "lit";
import { QuestionComponent } from "./question.component";
import { state } from "../valtio/valtio";

export class GameComponent extends LitElement {
  static get properties() {
    return {
      round: { type: Object },
    };
  }

  async connectedCallback() {
    super.connectedCallback();
    //this.round = await GetQuestionUseCase.execute();
  }

  render() {
    return html`
      <h1>Game</h1>
      <question-round></question-round>
    `;
  }
  createRenderRoot() {
    return this;
  }
}

customElements.define("trivia-game", GameComponent);

// import { LitElement, html } from "lit";
// import { QuestionComponent } from "../components/question.component";
// import { GameOverComponent } from "../components/game-over.component";
// import { snapshot } from "valtio";
// import { state } from "../valtio/valtio";

// export class GamePage extends LitElement {
//   static get properties() {
//     return {
//       gameOver: { type: Boolean },
//       //snap: { type: Object },
//     };
//   }

//   async connectedCallback() {
//     super.connectedCallback();
//     this.snap = snapshot(state);
//     this.gameOver = false;
//     this.addEventListener("game-over", (e) => this.gameOverEvent(e));
//   }

//   render() {
//     return html`
//       <h2>${this.snap.count}</h2>
//       ${this.gameOver
//         ? html`<game-over></game-over>`
//         : html` <question-round></question-round> `}
//     `;
//   }

//   gameOverEvent(e) {
//     this.gameOver = true;
//   }

//   createRenderRoot() {
//     return this;
//   }
// }

// customElements.define("game-page", GamePage);
