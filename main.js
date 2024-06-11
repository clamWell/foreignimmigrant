import initCommon from './js/common';
import './style.scss';

window.addEventListener('load', () => {
  initCommon();
  AOS.init();
  document.body.dataset.state = 'initialized';
});