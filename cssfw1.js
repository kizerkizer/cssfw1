window.onload = () => {
  if (!window) {
    console.warn('cssfw1 no window');
    return;
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
      console.log('layout-column');
      this.handleFractionalWidth();
    }
    handleFractionalWidth () {
      console.log('handleFractionalWidth');
      let fractionalWidth = this.attributes.getNamedItem('fractional-width');
      if (!fractionalWidth) {
        console.warn('no fractional-width');
        return;
      }
      let [numerator, denominator] = fractionalWidth.value.trim().split('/').map(str => parseInt(str, 10));
      console.log(numerator + '/' + denominator);
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
};
