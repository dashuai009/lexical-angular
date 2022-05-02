// /**
//  * Copyright (c) Meta Platforms, Inc. and affiliates.
//  *
//  * This source code is licensed under the MIT license found in the
//  * LICENSE file in the root directory of this source tree.
//  *
//  * @flow strict
//  */
//
//
// import {Component, Input} from "@angular/core";
// import type {EditorConfig, EditorState, LexicalEditor, LexicalNode, NodeKey} from 'lexical';
// import {EditorService} from "../../editor.service";
// import {mergeRegister} from "@lexical/utils";
// import {
//   $getNodeByKey,
//   $getSelection,
//   $isNodeSelection,
//   CLICK_COMMAND,
//   COMMAND_PRIORITY_LOW, createEditor, DecoratorNode,
//   KEY_BACKSPACE_COMMAND,
//   KEY_DELETE_COMMAND
// } from "lexical";
// import {NgElement, WithProperties} from "@angular/elements";
//
// @Component({
//   selector: 'lexical-image',
//   templateUrl: './image-node.html'
// })
// export class ImageComponent {
//   @Input()
//   src: string = '';
//   @Input()
//   altText: string = 'image';
//
//
//   @Input()
//   maxWidth: number = 2000;
//   @Input()
//   width: 'inherit' | number = 100
//   @Input()
//   height: 'inherit' | number = 100;
//
//
//   @Input()
//   showCaption: boolean = false;
//
//
//
//   @Input()
//   resizable: boolean = true;
//
//   nodeKey: NodeKey  | undefined;
//
//   selected = false;
//
//   constructor(private editor: EditorService) {
//     mergeRegister(
//       editor.registerCommand(
//         CLICK_COMMAND,
//         (payload) => {
//           const event: MouseEvent = payload as MouseEvent;
//
//           if (isResizing) {
//             return true;
//           }
//           if (event.target === ref.current) {
//             if (!event.shiftKey) {
//               clearSelection();
//             }
//             setSelected(!isSelected);
//             return true;
//           }
//
//           return false;
//         },
//         COMMAND_PRIORITY_LOW,
//       ),
//       editor.registerCommand(
//         KEY_DELETE_COMMAND,
//         this.onDelete,
//         COMMAND_PRIORITY_LOW,
//       ),
//       editor.registerCommand(
//         KEY_BACKSPACE_COMMAND,
//         this.onDelete,
//         COMMAND_PRIORITY_LOW,
//       )
//     )
//   }
//
//   onDelete(payload: any) {
//     if (this.selected && $isNodeSelection($getSelection())) {
//       const event: KeyboardEvent = payload;
//       event.preventDefault();
//       this.editor.update(() => {
//         const node = $getNodeByKey(this.nodeKey);
//         if ($isImageNode(node)) {
//           node!.remove();
//         }
//         this.selected = false;
//       });
//     }
//     return false;
//   }
//
// }
//
//
// export class ImageNode extends DecoratorNode<NgElement & WithProperties<ImageComponent>> {
//   __src: string;
//   __altText: string;
//   __maxWidth: number;
//   __width: 'inherit' | number;
//   __height: 'inherit' | number;
//   __showCaption: boolean;
//   __caption:string;
//   __resizable:boolean;
//
//   static getType(): string {
//     return 'image';
//   }
//
//   static clone(node: ImageNode): ImageNode {
//     return new ImageNode(
//       node.__src,
//       node.__altText,
//       node.__maxWidth,
//       node.__width,
//       node.__height,
//       node.__showCaption,
//       node.__caption,
//       node.__resizable,
//       node.__key,
//     );
//   }
//
//   constructor(
//     src: string,
//     altText: string,
//     maxWidth: number,
//     width?: 'inherit' | number,
//     height?: 'inherit' | number,
//     showCaption?: boolean,
//     caption?:string,
//     resizable?:boolean,
//     key?: NodeKey,
//   ) {
//     super(key);
//     this.__src = src;
//     this.__altText = altText;
//     this.__maxWidth = maxWidth;
//     this.__width = width || 'inherit';
//     this.__height = height || 'inherit';
//     this.__showCaption = showCaption || false;
//     this.__caption = caption || '';
//     this.__resizable = resizable || true;
//   }
//
//   setWidthAndHeight(
//     width: 'inherit' | number,
//     height: 'inherit' | number,
//   ): void {
//     const writable = this.getWritable();
//     // @ts-ignore
//     writable.__width = width;
//     // @ts-ignore
//     writable.__height = height;
//   }
//
//   setShowCaption(showCaption: boolean): void {
//     const writable = this.getWritable();
//     // @ts-ignore
//     writable.__showCaption = showCaption;
//   }
//
//   // View
//
//   override createDOM(config: EditorConfig): HTMLElement {
//     const span = document.createElement('span');
//     const theme = config.theme;
//     const className = theme.image;
//     if (className !== undefined) {
//       span.className = className;
//     }
//     return span;
//   }
//
//   override updateDOM() {
//     return false;
//   }
//
//   override decorate(): NgElement & WithProperties<ImageComponent> {
//     let imageNode =  document.createElement('lexical-image');
//     imageNode.src = this.__src;
//     imageNode.altText = this.__altText;
//     imageNode.maxWidth = this.__maxWidth;
//     imageNode.width = this.__width;
//     imageNode.height = this.__height;
//     imageNode.showCaption = this.__showCaption;
//     imageNode.resizable = this.__resizable;
//     return imageNode;
//   }
// }
//
// export function $createImageNode(src: string, altText: string, maxWidth: number) {
//   return new ImageNode(src, altText, maxWidth);
// }
//
// export function $isImageNode(node: any): boolean {
//   return node instanceof ImageNode;
// }
