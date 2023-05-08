export class HomePage extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <section class="home">
        <h1 class="home__title">TriviApp</h1>
        <p class="home__instructions">1 correct answer: +1 point<br> 1 wrong asnwer: game over</p>
        <a class="home__link" href="/game">Play</a>
      </section>
    `;
  }
}

customElements.define("home-page", HomePage);
