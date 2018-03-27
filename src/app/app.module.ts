import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { Phaser3Module } from './modules/phaser3/phaser3.module';


@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, Phaser3Module],
  bootstrap: [AppComponent]
})
export class AppModule { }
