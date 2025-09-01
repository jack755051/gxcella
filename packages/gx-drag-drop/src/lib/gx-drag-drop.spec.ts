import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GxDragDrop } from './gx-drag-drop';

describe('GxDragDrop', () => {
  let component: GxDragDrop;
  let fixture: ComponentFixture<GxDragDrop>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GxDragDrop]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GxDragDrop);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
