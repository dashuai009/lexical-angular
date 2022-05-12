import {Component, OnInit} from '@angular/core';
import {EditorService} from "../../lexical-composer/editor.service";
import * as lexical from "lexical";
import {$createParagraphNode, $getSelection, $isRangeSelection} from "lexical";
import {$wrapLeafNodesInElements} from "@lexical/selection";
import {$createHeadingNode, $createQuoteNode} from "@lexical/rich-text";
import {
  $handleListInsertParagraph,
  indentList, INSERT_CHECK_LIST_COMMAND,
  INSERT_ORDERED_LIST_COMMAND,
  INSERT_UNORDERED_LIST_COMMAND,
  insertList, ListType,
  outdentList,
  REMOVE_LIST_COMMAND,
  removeList
} from "@lexical/list";
import {$createCodeNode} from "@lexical/code";
import {mergeRegister} from "@lexical/utils";
import {LexicalCheckListPlugin} from "./LexicalCheckListPlugin";

@Component({
  selector: 'lexical-block-controls',
  templateUrl: './block-controls.component.html',
  styleUrls: ['./block-controls.component.scss']
})
export class BlockControlsComponent implements OnInit {

  blockType: 'paragraph' | 'h1' | 'h2' | 'h3' | ListType | 'quote' | 'code' = 'paragraph';
  ListCommand = new Map<ListType, any>([
    ['bullet', INSERT_UNORDERED_LIST_COMMAND],
    ['number', INSERT_ORDERED_LIST_COMMAND],
    ['check', INSERT_CHECK_LIST_COMMAND]
  ])

  constructor(private editor: EditorService) {
  }

  ngOnInit(): void {
    LexicalCheckListPlugin(this.editor.editor);
    mergeRegister(
      this.editor.editor.registerCommand(lexical.INDENT_CONTENT_COMMAND, () => {
        indentList();
        return false;
      }, lexical.COMMAND_PRIORITY_LOW),

      this.editor.editor.registerCommand(lexical.OUTDENT_CONTENT_COMMAND, () => {
        outdentList();
        return false;
      }, lexical.COMMAND_PRIORITY_LOW),

      this.editor.editor.registerCommand(REMOVE_LIST_COMMAND, () => {
        removeList(this.editor.editor);
        return true;
      }, lexical.COMMAND_PRIORITY_LOW),

      this.editor.editor.registerCommand(lexical.INSERT_PARAGRAPH_COMMAND, () => {
        return $handleListInsertParagraph();
      }, lexical.COMMAND_PRIORITY_LOW)
    );

    for (let listT of this.ListCommand.keys()) {
      this.editor.editor.registerCommand(this.ListCommand.get(listT), () => {
        insertList(this.editor.editor, listT);
        return true;
      }, lexical.COMMAND_PRIORITY_LOW)
    }
  }

  formatParagraph() {
    if (this.blockType !== 'paragraph') {
      this.editor.editor.update(() => {
        const selection = $getSelection();

        if ($isRangeSelection(selection)) {
          $wrapLeafNodesInElements(selection, () => $createParagraphNode());
        }
      });
    }
  };

  formatHeading(headingSize: any) {
    if (this.blockType !== headingSize) {
      this.editor.editor.update(() => {
        const selection = $getSelection();

        if ($isRangeSelection(selection)) {
          $wrapLeafNodesInElements(selection, () =>
            $createHeadingNode(headingSize),
          );
        }
      });
    }
  };

  formatList(listT: ListType) {
    if (this.blockType !== listT) {
      this.editor.editor.dispatchCommand(this.ListCommand.get(listT), null);
    } else {
      this.editor.editor.dispatchCommand(REMOVE_LIST_COMMAND, null);
    }
  }

  formatQuote() {
    if (this.blockType !== 'quote') {
      this.editor.editor.update(() => {
        const selection = $getSelection();

        if ($isRangeSelection(selection)) {
          $wrapLeafNodesInElements(selection, () => $createQuoteNode());
        }
      });
    }
  };

  formatCode = () => {
    if (this.blockType !== 'code') {
      this.editor.editor.update(() => {
        const selection = $getSelection();

        if ($isRangeSelection(selection)) {
          if (selection.isCollapsed()) {
            $wrapLeafNodesInElements(selection, () => $createCodeNode());
          } else {
            const textContent = selection.getTextContent();
            const codeNode = $createCodeNode();
            selection.removeText();
            selection.insertNodes([codeNode]);
            selection.insertRawText(textContent);
          }
        }
      });
    }
  };
}
