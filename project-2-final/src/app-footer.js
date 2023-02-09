const template = document.createElement("template");
template.innerHTML = `
<style>
:host{
  display: block;
  background-color: #ddd;
  border-top: 1px solid black;
  border-bottom: 1px solid black;
  margin-top: .5em;
  margin-bottom: .5em;
}
footer{
  font-variant: small-caps;
  font-family: sans-serif;
  text-align: center;
}
</style>
<footer class="footer"></footer>
`;

class AppFooter extends HTMLElement{
  constructor(){
    super();
    this.attachShadow({mode: "open"});
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    this.shadowRoot.querySelector(".footer").innerHTML = `Gabe Goldsteen - RPG Audio Visualizer - Project 2`;

  }
  
//   connectedCallback(){
//     this.render();
//   }

//   render(){
//     this.shadowRoot.querySelector("footer").innerHTML = `Gabe Goldsteen - Genshin Impact API Project 2`;
//   }
} 

customElements.define('app-footer', AppFooter);