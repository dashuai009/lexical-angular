import { Component, OnInit } from '@angular/core';
import * as lexical from "lexical";
import {EditorService} from "../../lexical-composer/editor.service";

@Component({
  selector: 'lexical-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit {
  canUndo = false;
  canRedo = false;

  constructor(private editor:EditorService) {
    this.editor.registerCommand(lexical.CAN_UNDO_COMMAND, (payload) => {
      this.canUndo = payload as boolean;
      return false;
    }, 1)
    this.editor.registerCommand(lexical.CAN_REDO_COMMAND, (payload) => {
      this.canRedo = payload as boolean;
      return false;
    }, 1)
  }

  ngOnInit(): void {
  }

  undo() {
    this.editor.dispatchCommand(lexical.UNDO_COMMAND, null);
  }

  redo() {
    this.editor.dispatchCommand(lexical.REDO_COMMAND, null);
  }
}
