import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {LexicalComposerModule} from "./lexical-composer/lexical-composer.module";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    LexicalComposerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
