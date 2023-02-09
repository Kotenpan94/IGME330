const template = document.createElement("template");
template.innerHTML = `
<style>
:host{
  display: block;
  background-color: #1FD655;
  border-top: 1px solid black;
  border-bottom: 1px solid black;
  margin-top: .5em;
  margin-bottom: .5em;

}
h1{
    background-color: #90EE90;
}

</style>
<h1 class="title has-text-warning has-background-link has-text-centered">
<a class="title has-text-warning" href="home.html"></a>
</h1>`;

class AppHeader extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.shadowRoot.appendChild(template.content.cloneNode(true));
        this.shadowRoot.querySelector("h1").innerHTML = `RPG Audio Visualizer`;

    }

    //   connectedCallback(){
    //     this.render();
    //   }

    //   render(){
    //     this.shadowRoot.querySelector("footer").innerHTML = `Gabe Goldsteen - Genshin Impact API Project 2`;
    //   }
}

customElements.define('app-header', AppHeader);