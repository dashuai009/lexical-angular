import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {InsertComponent} from './insert.component';
import {MatButtonModule} from "@angular/material/button";
import {MatMenuModule} from "@angular/material/menu";
import {MatIconModule} from "@angular/material/icon";
// import {ImageComponent} from "./image-node";
import {LexicalHr} from "./horizontal-rule";

@NgModule({
  declarations: [
    InsertComponent,LexicalHr//,ImageComponent
  ],
  exports: [
    InsertComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatMenuModule,
    MatIconModule
  ]
})
export class InsertModule {
}
