import { Component } from '@angular/core';

import { SceneService } from './scene.service';

/**
 * Application component.
 */
@Component({
  selector: 'app-root',
  template: `<phaser3-component (gameReady)="onGameReady($event)" [gameConfig]="config" [Phaser]="phaser"></phaser3-component>`,
  styles: [],
  providers: [SceneService]
})
export class AppComponent {
  /**
   * Game configuration.
   */
  public readonly config = {
    title: 'Phaser Component Library',
    version: '0.1.0-alpha',
    type: Phaser.AUTO,
    pixelArt: true,
    width: window.innerWidth,
    height: window.innerHeight
  };

  /**
   * Phaser API.
   */
  public readonly phaser = Phaser;

  /**
   * Instantiate scene service.
   *
   * @param sceneService Scene service.
   */
  public constructor(public sceneService: SceneService) { }

  /**
   * On game ready event handler.
   *
   * @param game Game instance.
   */
  public onGameReady(game): void {
    game.scene.add('Scene', this.sceneService, true);
  }
}
