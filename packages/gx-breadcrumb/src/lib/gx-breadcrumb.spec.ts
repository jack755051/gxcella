import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GxBreadcrumb } from './gx-breadcrumb';

describe('GxBreadcrumb', () => {
  let component: GxBreadcrumb;
  let fixture: ComponentFixture<GxBreadcrumb>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GxBreadcrumb]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GxBreadcrumb);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
