/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow strict
 */

import  {
  DOMConversionMap,
  DOMConversionOutput,
  DOMExportOutput,
  LexicalCommand,
  LexicalNode,
} from 'lexical';

import {createCommand, DecoratorNode} from 'lexical';
import {Component} from "@angular/core";
import {NgElement, WithProperties} from "@angular/elements";

export const INSERT_HORIZONTAL_RULE_COMMAND: LexicalCommand<void> =
  createCommand();

@Component({
  selector:'lexical-hr',
  template:'<hr/>'
})
export class LexicalHr{
  constructor() {
  }
}
export class HorizontalRuleNode extends DecoratorNode<NgElement & WithProperties<LexicalHr>> {
  static getType(): string {
    return 'horizontalrule';
  }

  static clone(node: HorizontalRuleNode): HorizontalRuleNode {
    return new HorizontalRuleNode(node.__key);
  }

  static importDOM(): DOMConversionMap | null {
    return {
      hr: (node: Node) => ({
        conversion: convertHorizontalRuleElement,
        priority: 0,
      }),
    };
  }

  override exportDOM(): DOMExportOutput {
    return {element: document.createElement('hr')};
  }

  override createDOM(): HTMLElement {
    const div = document.createElement('div');
    div.style.display = 'contents';
    return div;
  }

  override getTextContent() {
    return '\n';
  }

  override isTopLevel() {
    return true;
  }

  override updateDOM() {
    return false;
  }

  override decorate():NgElement & WithProperties<LexicalHr>{
    return document.createElement('lexical-hr');
  }
}

function convertHorizontalRuleElement(): DOMConversionOutput {
  return {node: $createHorizontalRuleNode()};
}

export function $createHorizontalRuleNode(): HorizontalRuleNode {
  return new HorizontalRuleNode();
}

export function $isHorizontalRuleNode(node: LexicalNode | null) {
  return node instanceof HorizontalRuleNode;
}
