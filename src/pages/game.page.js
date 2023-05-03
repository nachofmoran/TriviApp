import "../components/game.component";

export class GamePage extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <trivia-game></trivia-game>
    `;
  }
}

customElements.define("game-page", GamePage);
