import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FontComponent} from "./font.component";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatMenuModule} from "@angular/material/menu";


@NgModule({
  declarations: [FontComponent],
  exports: [
    FontComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule
  ]
})
export class FontModule { }
