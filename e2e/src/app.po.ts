import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get('/');
  }
  getPhaserCanvas() {
    return element(by.css('app-root phaser-component canvas'));
  }
}
