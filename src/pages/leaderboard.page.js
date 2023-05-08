// import "../components/leaderboard.component";
// import { state } from "../valtio/valtio";

// export class LeaderboardPage extends HTMLElement {
//   connectedCallback() {
//     this.innerHTML = `
//       <h2>${state.count}</h2>
//       <leader-board></leader-board>
//     `;
//   }
// }

// customElements.define("leaderboard-page", LeaderboardPage);
import { LitElement, html } from "lit";
import { state } from "../valtio/valtio";
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
    console.log("leaderboard: ", this.leaderboard);
    this.leaderboard.sort((a, b) => (a.score > b.score ? -1 : 1));
    this.loading = false;
  }

  render() {
    return html`
      <h1>Leaderboard</h1>
      ${this.loading
        ? html`<h2>loading leaderboard...</h2>`
        : html`
            <ul>
              ${this.leaderboard?.map(
                (item) => html`<li>
                  <p>${item.name}: ${item.score}</p>
                </li> `
              )}
            </ul>
          `}
      <a href="/game">Let´s play</a>
    `;
  }

  createRenderRoot() {
    return this;
  }
}

customElements.define("leaderboard-page", LeaderboardPage);
