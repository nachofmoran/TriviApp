import { LitElement, html } from "lit";

export class LeaderboardComponent extends LitElement {
  static get properties() {
    return {};
  }

  async connectedCallback() {
    super.connectedCallback();
  }

  render() {
    return html` <h1>Leaderboard</h1> `;
  }

  createRenderRoot() {
    return this;
  }
}

customElements.define("leader-board", LeaderboardComponent);
