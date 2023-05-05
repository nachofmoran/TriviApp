import { LitElement, html } from "lit";

export class HomeComponent extends LitElement {
  static get properties() {
    return {};
  }

  async connectedCallback() {
    super.connectedCallback();
  }

  render() {
    return html`
      <h1>Home</h1>
      <a href="/game">Play</a>
    `;
  }

  createRenderRoot() {
    return this;
  }
}

customElements.define("home-component", HomeComponent);
