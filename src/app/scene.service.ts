import { Injectable } from '@angular/core';

/**
 * Scene service.
 */
@Injectable()
export class SceneService extends Phaser.Scene {
  /**
   * Instantiate scene service
   */
  public constructor() {
    super({ key: 'Scene' });
  }

  /**
   * Scene creation handler.
   */
  public create(): void {
    this.cameras.main.startFollow(this.add.text(0, 0, 'Hello World!'), false);
  }
}
