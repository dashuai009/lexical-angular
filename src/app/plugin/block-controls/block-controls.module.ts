import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {BlockControlsComponent} from "./block-controls.component";
import {MatButtonModule} from "@angular/material/button";
import {MatMenuModule} from "@angular/material/menu";
import {MatIconModule} from "@angular/material/icon";



@NgModule({
  declarations: [BlockControlsComponent],
  exports: [
    BlockControlsComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatMenuModule,
    MatIconModule
  ]
})
export class BlockControlsModule { }
