import { LitElement, html } from "lit";
import { AddScoreUseCase } from "../usecases/add-score.usecase";
import { state } from "../valtio/valtio";
import { Router } from "@vaadin/router";

export class GameOverComponent extends LitElement {
  static get properties() {
    return {
      loading: { type: Boolean },
      leaderBoard: { type: Array },
      playerInput: { type: Object },
    };
  }

  async connectedCallback() {
    super.connectedCallback();
    this.addEventListener("submit", this.submitScoreButton);
    this.playerInput = this.getElementsByClassName("player-input");
  }

  render() {
    return html`
      <article>
        <p>Game Over. Score: ${state.count}</p>
        <form>
          <input type="text" id="playerinput" class="player-input" value="" />
          <input type="submit" id="submit-btn" value="Submit" />
        </form>
      </article>
    `;
  }

  async submitScoreButton(e) {
    e.preventDefault();
    this.loading = true;
    await AddScoreUseCase.execute(this.playerInput[0].value, state.count);
    this.loading = false;
    state.count = 0;
    Router.go("/leaderboard");
  }

  createRenderRoot() {
    return this;
  }
}

customElements.define("game-over", GameOverComponent);
