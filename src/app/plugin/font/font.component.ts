import {Component, OnInit} from '@angular/core';
import {EditorService} from "../../lexical-composer/editor.service";
import {$getSelection, $isRangeSelection, FORMAT_TEXT_COMMAND} from "lexical";
import {$patchStyleText} from "@lexical/selection";

@Component({
  selector: 'lexical-font',
  templateUrl: './font.component.html',
  styleUrls: ['./font.component.scss']
})
export class FontComponent implements OnInit {
  fontFamily = ['Arial', 'Courier New', 'Georgia', 'Times New Roman', 'Trebuchet MS', 'Verdana'];
  curFont = 'Arial';
  fontSize: number[] = [];
  curSize = 10;

  textFormat = ['bold', 'italic', 'underline', 'strikethrough', 'code']
  formatIcon = ['format_bold', 'format_italic', 'format_underline', 'strikethrough_s', 'code']

  constructor(private editor: EditorService) {
    for (let i = 10; i < 20; ++i) {
      this.fontSize.push(i);
    }
  }

  ngOnInit(): void {
  }

  applyStyleText(styles: any) {
    this.editor.editor.update(() => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        $patchStyleText(selection, styles);
      }
    });
  }

  applyFontFamily(font: string) {
    this.applyStyleText({'font-family': font})
  }

  applyFontSize(size: number) {
    this.applyStyleText({'font-size': `${size}px`})
  }

  applyFormatStyle(style: string) {
    this.editor.editor.dispatchCommand(FORMAT_TEXT_COMMAND, style);
  }
}
