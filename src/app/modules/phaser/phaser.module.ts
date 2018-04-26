import { NgModule } from '@angular/core';

import { PhaserComponent } from './phaser.component';

/**
 * Phaser module. Exports [PhaserComponent]{@link PhaserComponent}.
 */
@NgModule({
  declarations: [PhaserComponent],
  exports: [PhaserComponent]
})
export class PhaserModule { }
