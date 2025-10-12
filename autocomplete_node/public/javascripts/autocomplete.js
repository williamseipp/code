const Autocomplete = {
  bindEvents: function() {
    this.input.addEventListener('input', this.valueChanged.bind(this));
  },

  // something that we do in response to a change in the input field
  valueChanged: async function() {
    let value = this.input.value;

    if (value.length > 0) {
      this.matches = await this.fetchMatches(value);
      this.visible = true;
      this.draw();
    } else {
      this.reset();
    }
  },

  draw: function() {
    // removes all matches that might have previously been displayed
    while (this.listUI.lastChild) {
      this.listUI.removeChild(this.listUI.lastChild);
    }
    // if autocomplete is invisible, reset text as final step
    if (!this.visible) {
      this.overlay.textContent = '';
      return;
    }
    // render the server data
    this.matches.forEach(match => {
      let li = document.createElement('li');
      li.classList.add('autocomplete-ui-choice');

      li.textContent = match.name;
      this.listUI.appendChild(li);
    });
  },


  reset: function() {
    this.visible = false;
    this.matches = [];

    this.draw();
  },

  fetchMatches: async function(query) {
    let response = await fetch(`${this.url}${encodeURIComponent(query)}`);
    let data = await response.json();
    return data;
  },

  wrapInput: function() {
    let wrapper = document.createElement('div');
    wrapper.classList.add('autocomplete-wrapper');
    this.input.parentNode.appendChild(wrapper);
    wrapper.appendChild(this.input);
  },

  createUI: function() {
    let listUI = document.createElement('ul');
    listUI.classList.add('autocomplete-ui');
    this.input.parentNode.appendChild(listUI);
    this.listUI = listUI;

    let overlay = document.createElement('div');
    overlay.classList.add('autocomplete-overlay');
    overlay.style.width = `${this.input.clientWidth}px`;

    this.input.parentNode.appendChild(overlay);
    this.overlay = overlay;
  },

  init: function() {
    this.input = document.querySelector('input');
    this.url = '/countries?matching=';

    this.listUI = null;
    this.overlay = null;

    this.visible = false;
    this.matches = [];

    this.wrapInput();
    this.createUI();

    this.bindEvents();
    this.reset();
  }
};

document.addEventListener('DOMContentLoaded', () => {
  Autocomplete.init();
});
