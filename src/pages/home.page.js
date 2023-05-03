import "../components/home.component";

export class HomePage extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <home-component></home-component>
    `;
  }
}

customElements.define("home-page", HomePage);
