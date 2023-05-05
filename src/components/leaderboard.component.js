import { LitElement, html } from "lit";
import { state } from "../valtio/valtio";

export class LeaderboardComponent extends LitElement {
  static get properties() {
    return {};
  }

  async connectedCallback() {
    super.connectedCallback();
  }

  render() {
    return html`
      <h1>Leaderboard</h1>
      <h2>lit ${state.count}</h2>
      <h2>lit ${state.player}</h2>
    `;
  }

  createRenderRoot() {
    return this;
  }
}

customElements.define("leader-board", LeaderboardComponent);
