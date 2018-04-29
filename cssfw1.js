{
  if (!window) {
    console.warn('cssfw1 no window');
    goto end;
  }
  let ce = window.customElements;
  ce.define('layout-container', class extends HTMLElement {
    constructor () {
      super();
    }
  });
  ce.define('layout-column', class extends HTMLElement {
    constructor () {
      super();
      if ('fractional-width' in this.attributes) {
        this.handleFractionalWidth();
      }
    }
    handleFractionalWidth () {
      if (!('fractional-width' in this.attributes)) {
        return;
      }
      let [numerator, denominator] = (this.attributes['fractional-width'].value() + '').trim().slice('/').map(str => parseInt(str, 10));
      if (isNaN(numerator) || isNaN(denominator) || !denominator) {
        console.warn(`cssfw1 invalid fractional width ${numerator}/${denominator} on:`);
        console.warn(this);
        return;
      }
      this.style.width = ((numerator / denominator) * 100) + '%';
    }
    attributeChangedCallback (attributeName, previousValue, newValue) {
      if (attributeName === 'fractional-width') {
        handleFractionalWidth();
      }
    }
  });
  ce.define('layout-row', class extends HTMLElement {
    constructor () {
      super();
    }
  });
} end:
