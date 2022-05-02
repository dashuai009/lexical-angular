import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LexicalComposerComponent} from "./lexical-composer.component";
import {ToolbarModule} from "../toolbar/toolbar.module";

@NgModule({
  declarations: [LexicalComposerComponent],
  exports: [
    LexicalComposerComponent
  ],
  imports: [
    CommonModule,
    ToolbarModule
  ]
})
export class LexicalComposerModule {
}
