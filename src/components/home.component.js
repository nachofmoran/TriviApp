import { LitElement, html } from "lit";

export class HomeComponent extends LitElement {
  static get properties() {
    return {};
  }

  async connectedCallback() {
    super.connectedCallback();
    console.log("entramos en el callback");
  }

  render() {
    return html` <h1>Home</h1> `;
  }
  createRenderRoot() {
    return this;
  }
}

customElements.define("home-component", HomeComponent);
