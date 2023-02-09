const template = document.createElement("template");
template.innerHTML =
    `
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.9.3/css/bulma.min.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css"

    <style>
   
    </style>
      
    <nav class="navbar has-shadow is-white">
   
    <div class="navbar-brand">
      <a class="navbar-item" href="home.html">
        <i class="fas fa-gamepad"></i>
      </a>
      <a class="navbar-burger" id="burger">
        <span></span>
        <span></span>
        <span></span>
      </a>
    </div>

    <div class="navbar-menu" id="nav-links">

      <div class="navbar-start">
      <a class="navbar-item is-hoverable" id="home" href="home.html">Home</a>
      <a class="navbar-item is-hoverable" id="application" href="app.html">App</a>
      <a class="navbar-item is-hoverable" id="favorites" href="favorites.html">Favorites</a>
      <a class="navbar-item is-hoverable" id="community" href="community.html">Community</a>
      <a class="navbar-item is-hoverable" id="documentation" href="documentation.html">Documentation</a>

      </div> 
    </div>
  </nav>
  
`
class Nav extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.shadowRoot.appendChild(template.content.cloneNode(true));
         //mobile menu
        


    }
    connectedCallback() {
        this.render();
    }
    render() {
        this.burgerIcon = this.shadowRoot.querySelector('#burger');
        this.navbarMenu = this.shadowRoot.querySelector('#nav-links');
        console.log(this.burgerIcon);
        this.burgerIcon.addEventListener("click", () => {
            this.navbarMenu.classList.toggle('is-active');
        })
        // Create a dataset
        const datanav = this.getAttribute('data-nav');
        // Check dataset based on page
        // If the two match, highlight as bold, if not, then don't highlight
        if (datanav == "home"){
            this.shadowRoot.querySelector("#home").className = "is-hoverable navbar-item has-text-weight-bold";
        }
        else if (datanav == "appliaction"){
            this.shadowRoot.querySelector("#application").className = "is-hoverable navbar-item has-text-weight-bold";

        }
        else if (datanav == "favorites"){
            this.shadowRoot.querySelector("#favorites").className = "is-hoverable navbar-item has-text-weight-bold";

        }
        else if (datanav == "community"){
            this.shadowRoot.querySelector("#community").className = "is-hoverable navbar-item has-text-weight-bold";

        }
        else if (datanav == "documentation"){
            this.shadowRoot.querySelector("#documentation").className = "is-hoverable navbar-item has-text-weight-bold";

        }
    }
}

customElements.define('app-navbar', Nav);