import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ToolbarComponent} from "./toolbar.component";
import {HistoryModule} from "../plugin/history/history.module";
import {BlockControlsModule} from "../plugin/block-controls/block-controls.module";
import {FontModule} from "../plugin/font/font.module";
import {InsertModule} from "../plugin/insert/insert.module";

@NgModule({
  declarations: [ToolbarComponent],
  exports: [
    ToolbarComponent
  ],
  imports: [
    CommonModule,
    HistoryModule,
    BlockControlsModule,
    FontModule,
    InsertModule
  ]
})
export class ToolbarModule {
}
