import {Component, OnInit} from '@angular/core';
import {EditorService} from "../lexical-composer/editor.service";
import * as lexical from "lexical";

@Component({
  selector: 'lexical-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {


  constructor(private editor: EditorService) {

  }

  ngOnInit(): void {
  }



}
