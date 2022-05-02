import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {EditorService, defaultConfig} from "./editor.service";

@Component({
  selector: 'lexical-lexical-composer',
  templateUrl: './lexical-composer.component.html',
  styleUrls: ['./lexical-composer.component.scss'],
  providers: [EditorService]
})
export class LexicalComposerComponent implements OnInit, AfterViewInit {

  @ViewChild('editor')
  editorRef?: ElementRef;

  constructor(private editor: EditorService) {
    //this.editor.createEditor(defaultConfig);
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.editor.setRootElement(this.editorRef!.nativeElement);
    console.log(this.editor.getDecorators());
    //this.editor.editor.setReadOnly(true);
    console.log(this.editor.getEditorState());
  }

}
