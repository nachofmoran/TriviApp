import "../components/leaderboard.component";

export class LeaderboardPage extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <leader-board></leader-board>
    `;
  }
}

customElements.define("leaderboard-page", LeaderboardPage);
