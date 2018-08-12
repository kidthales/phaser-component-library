import { AppPage } from './app.po';

describe('phaser-component-library Example App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should have Phaser canvas', () => {
    page.navigateTo();
    expect(page.getPhaserCanvas()).toBeTruthy();
  });
});
