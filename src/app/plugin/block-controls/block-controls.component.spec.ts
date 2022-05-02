import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlockControlsComponent } from './block-controls.component';

describe('BlockControlsComponent', () => {
  let component: BlockControlsComponent;
  let fixture: ComponentFixture<BlockControlsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BlockControlsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BlockControlsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
