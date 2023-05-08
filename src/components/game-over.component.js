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
      submitButton: { type: Array },
    };
  }

  async connectedCallback() {
    super.connectedCallback();
    this.addEventListener("submit", this.submitScoreButton);
    this.playerInput = this.getElementsByClassName("player-input");
    this.buttonSubmit = this.getElementsByClassName("submit-button");
  }

  render() {
    return html`
      ${this.loading
        ? html`<h2>saving score...</h2>`
        : html`
            <article>
              <p>Game Over. Score: ${state.count}</p>
              <form>
                <input
                  type="text"
                  id="playerinput"
                  class="player-input"
                  value=""
                  @input="${this.enableSubmit}"
                />
                <input
                  type="submit"
                  class="submit-button"
                  id="submit-btn"
                  value="Submit"
                  disabled
                />
                <button type="button" @click="${this.cancelButton}">
                  Cancel
                </button>
              </form>
            </article>
          `}
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

  cancelButton() {
    Router.go("/leaderboard");
  }

  enableSubmit() {
    console.log("Habilitamos submit");
    if (this.playerInput[0].value !== "") this.buttonSubmit[0].disabled = false;
    else this.buttonSubmit[0].disabled = true;
  }

  createRenderRoot() {
    return this;
  }
}

customElements.define("game-over", GameOverComponent);
