import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `<phaser3-component (gameReady)="onGameReady($event)"></phaser3-component>`,
  styles: []
})
export class AppComponent {
  public onGameReady($event): void {
    console.log($event);
  }
}
