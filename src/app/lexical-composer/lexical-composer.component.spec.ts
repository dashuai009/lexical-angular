import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LexicalComposerComponent } from './lexical-composer.component';

describe('LexicalComposerComponent', () => {
  let component: LexicalComposerComponent;
  let fixture: ComponentFixture<LexicalComposerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LexicalComposerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LexicalComposerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
