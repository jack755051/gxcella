import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GxTable } from './gx-table';

describe('GxTable', () => {
  let component: GxTable;
  let fixture: ComponentFixture<GxTable>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GxTable]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GxTable);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
