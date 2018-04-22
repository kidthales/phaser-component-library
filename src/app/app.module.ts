import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { PhaserModule } from './modules/phaser/phaser.module';

/**
 * Application module.
 */
@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, PhaserModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
