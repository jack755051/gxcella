import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GxStyles } from './gx-styles';

describe('GxStyles', () => {
  let component: GxStyles;
  let fixture: ComponentFixture<GxStyles>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GxStyles]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GxStyles);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
