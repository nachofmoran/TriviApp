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
    this.playerInput = this.getElementsByClassName("game-over__name");
    this.buttonSubmit = this.getElementsByClassName(
      "game-over__button--submit"
    );
  }

  render() {
    return html`
      ${this.loading
        ? html`<h2 class="game-over__loading">saving score...</h2>`
        : html`
            <article class="game-over">
              <h2 class="game-over__title">Game Over</h2>
              <p class="game-over__score">Score: ${state.count}</p>
              <form class="game-over__form">
                <label for="playerinput">Name</label>
                <input
                  type="text"
                  id="playerinput"
                  class="game-over__name"
                  value=""
                  @input="${this.enableSubmit}"
                />
                <input
                  type="submit"
                  class="game-over__button--submit"
                  id="submit-btn"
                  value="Submit"
                  disabled
                />
                <button
                  class="game-over__button--cancel"
                  type="button"
                  @click="${this.cancelButton}"
                >
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
    if (this.playerInput[0].value !== "") this.buttonSubmit[0].disabled = false;
    else this.buttonSubmit[0].disabled = true;
  }

  createRenderRoot() {
    return this;
  }
}

customElements.define("game-over", GameOverComponent);
