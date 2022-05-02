import {Component, Injector, OnInit} from '@angular/core';
import {EditorService} from "../../lexical-composer/editor.service";
import {$getSelection, $isRangeSelection, COMMAND_PRIORITY_EDITOR} from "lexical";
import {$createHorizontalRuleNode, INSERT_HORIZONTAL_RULE_COMMAND, LexicalHr} from "./horizontal-rule";
import {createCustomElement, NgElement, WithProperties} from "@angular/elements";
// import {ImageComponent} from "./image-node";


declare global {
  interface HTMLElementTagNameMap {
    'my-dialog': NgElement & WithProperties<{content: string}>;
    'my-other-element': NgElement & WithProperties<{foo: 'bar'}>;
    // 'lexical-image':NgElement & WithProperties<ImageComponent>
    'lexical-hr':NgElement & WithProperties<LexicalHr>
  }
}



@Component({
  selector: 'lexical-insert',
  templateUrl: './insert.component.html',
  styleUrls: ['./insert.component.scss']
})
export class InsertComponent implements OnInit {

  constructor(private editor:EditorService,private injector:Injector) {
    const LexicalHrElement = createCustomElement(LexicalHr, {injector});
    // Register the custom element with the browser.
    customElements.define('lexical-hr', LexicalHrElement);

    editor.editor.registerCommand(
      INSERT_HORIZONTAL_RULE_COMMAND,
      (type) => {
        const selection = $getSelection();
        if (!$isRangeSelection(selection)) {
          return false;
        }

        const focusNode = selection.focus.getNode();
        if (focusNode !== null) {
          const horizontalRuleNode = $createHorizontalRuleNode();
          selection.insertParagraph();
          selection.focus
            .getNode()
            .getTopLevelElementOrThrow()
            .insertBefore(horizontalRuleNode);
        }

        return true;
      },
      COMMAND_PRIORITY_EDITOR,
    );

  }

  ngOnInit(): void {
  }
  insertHorizontalRule(){
    this.editor.editor.dispatchCommand(INSERT_HORIZONTAL_RULE_COMMAND,null);
    console.log(this.editor.editor.getDecorators());;
  }
}
