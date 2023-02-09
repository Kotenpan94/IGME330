const template = document.createElement("template");
template.innerHTML = `
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css" integrity="sha512-iBBXm8fW90+nuLcSKlbmrPcLa0OT92xO1BIsZ+ywDWZCvqsWgccV3gFoRBv0z+8dLJgyAHIhR35VZc2oM/gI1w==" crossorigin="anonymous" referrerpolicy="no-referrer" />
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.9.3/css/bulma.min.css">
<div class="box has-background-info-dark">
          <div class="is-large p-1">
            <h2 class="subtitle has-text-weight-bold mb-2 mt-0 has-text-light">My Results</h2>
            <p id="element-status" class="has-text-warning mb-2">Click the <b>Search</b> button to see characters</p>
            <div class="element-card-holder">
              <!-- Search results go here -->
            </div>
          </div>
        </div>
`;

class AppResults extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.shadowRoot.appendChild(template.content.cloneNode(true));

    }
}

customElements.define('app-results', AppResults);

