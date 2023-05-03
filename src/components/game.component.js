import { LitElement, html } from "lit";

export class GameComponent extends LitElement {
  static get properties() {
    return {};
  }

  async connectedCallback() {
    super.connectedCallback();
  }

  render() {
    return html` <h1>Game</h1> `;
  }
  createRenderRoot() {
    return this;
  }
}

customElements.define("trivia-game", GameComponent);
