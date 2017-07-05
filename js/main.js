import Ui from './ui'

if(window.Primo && window.Primo.explore){
  window.Primo.explore._ui = new Ui();
} else {
    console.log('This is a plugin please use "primo-explore-dom".');
    console.log('see https://github.com/mehmetc/primo-explore-dom');
}
