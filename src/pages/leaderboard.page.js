import { LitElement, html } from "lit";
import { GetLeaderboardUseCase } from "../usecases/get-leaderboard.usecase";

export class LeaderboardPage extends LitElement {
  static get properties() {
    return {
      loading: { type: Boolean },
      leaderboard: { type: Array },
    };
  }

  async connectedCallback() {
    super.connectedCallback();
    this.loading = true;
    this.leaderboard = await GetLeaderboardUseCase.execute();
    this.leaderboard.sort((a, b) => (a.score > b.score ? -1 : 1));
    this.loading = false;
  }

  render() {
    return html`
      ${this.loading
        ? html`<h2 class="leaderboard__loading">loading leaderboard...</h2>`
        : html`
            <article class="leaderboard">
              <h2 class="leaderboard__title">Leaderboard</h2>
              <ul class="leaderboard__list">
                ${this.leaderboard?.map(
                  (item) => html`<li class="leaderboard_item">
                    <p>${item.name}: ${item.score}</p>
                  </li> `
                )}
              </ul>
              <a href="/game" class="leaderboard__button">Play</a>
            </article>
          `}
    `;
  }

  createRenderRoot() {
    return this;
  }
}

customElements.define("leaderboard-page", LeaderboardPage);
