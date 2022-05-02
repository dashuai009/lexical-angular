import {ElementRef, Injectable, Injector} from '@angular/core';
import {PlaygroundEditorTheme} from "../theme/PlaygroundEditorTheme";
import {HeadingNode, QuoteNode} from "@lexical/rich-text";
import {ListItemNode, ListNode} from "@lexical/list";
import {CodeHighlightNode, CodeNode} from "@lexical/code";
import {TableCellNode, TableNode, TableRowNode} from "@lexical/table";
import {AutoLinkNode, LinkNode} from "@lexical/link";
import * as lexical from "lexical";
import {mergeRegister} from '@lexical/utils';
import {registerDragonSupport} from "@lexical/dragon";
import {registerRichText} from "@lexical/rich-text";
import {registerHistory, createEmptyHistoryState} from "@lexical/history";
import {HorizontalRuleNode} from "../plugin/insert/horizontal-rule";
import {
  $getSelection,
  CommandListener, CommandListenerPriority,
  DecoratorListener, EditorUpdateOptions,
  LexicalCommand, LexicalNode,
  RootListener,
  TextContentListener,
  UpdateListener
} from "lexical";


export const defaultConfig: any = {
  // The editor theme
  theme: PlaygroundEditorTheme,
  // Handling of errors during update
  onError(error: any) {
    console.log(error);
    throw error;
  },
  // Any custom nodes go here
  nodes: [
    HeadingNode,
    ListNode,
    ListItemNode,
    QuoteNode,
    CodeNode,
    CodeHighlightNode,
    TableNode,
    TableCellNode,
    TableRowNode,
    AutoLinkNode,
    LinkNode,
    HorizontalRuleNode
  ]
};

export class EditorService {
  editor: lexical.LexicalEditor;
  historyState: any

  constructor() {
    this.historyState = createEmptyHistoryState()
    this.editor = lexical.createEditor(defaultConfig);
    this.editor.registerDecoratorListener((x) => {///???
      for (let i in x) {
        this.editor.getElementByKey(i)?.replaceChildren(x[i])
      }
    })
    // this.editor.registerUpdateListener((editorState: any) => {
    //   this.selection = editorState.read(() => $getSelection());
    // })
    registerDragonSupport(this.editor);
    registerRichText(this.editor)
    registerHistory(this.editor, this.historyState, 1000);
  }

  //======================  selection =========================
  selection :LexicalNode | undefined;



  ///-===================== end selection ====================

  createEditor(config: any) {
    this.editor = lexical.createEditor(config);
  }


  // isComposing(): boolean;
  registerUpdateListener(listener: UpdateListener) {
    return this.editor.registerUpdateListener(listener)
  }
  // registerRootListener(listener: RootListener): () => void;
  // registerDecoratorListener(listener: DecoratorListener): () => void;
  // registerTextContentListener(listener: TextContentListener): () => void;
  registerCommand<P>(
    command: LexicalCommand<P>,
    listener: CommandListener<P>,
    priority: CommandListenerPriority,
  ) {
    return this.editor.registerCommand<P>(command, listener, priority);
  };

  // registerReadOnlyListener(listener: lexical.ReadOnlyListener) {
  //
  // };

  registerMutationListener(
    klass: any,
    listener: lexical.MutationListener,
  ) {
  };

  registerNodeTransform<T extends lexical.LexicalNode>(
    klass: any,
    listener: lexical.Transform<T>,
  ) {

  };

  dispatchCommand<P>(type: string, payload: P) {
    return this.editor.dispatchCommand(type, payload);
  }

  // hasNodes(nodes: Array<Class<LexicalNode>>): boolean;
  getDecorators<X>() {
    return this.editor.getDecorators<X>();
  };

  // getRootElement(): null | HTMLElement;
  setRootElement(rootElement: null | HTMLElement) {
    this.editor.setRootElement(rootElement);
  };

  // getElementByKey(key: NodeKey): null | HTMLElement;
  getEditorState() {
    return this.editor.getEditorState();
  };

  // setEditorState(editorState: EditorState, options?: EditorSetOptions): void;
  // parseEditorState(stringifiedEditorState: string): EditorState;
  update(updateFn: () => void, options?: EditorUpdateOptions){
    return this.editor.update(updateFn,options);
  }
  // focus(callbackFn?: () => void): void;
  // blur(): void;
  // isReadOnly(): boolean;
  // setReadOnly(readOnly: boolean): void;

}
