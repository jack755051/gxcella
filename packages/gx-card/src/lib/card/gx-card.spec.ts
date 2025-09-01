import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GxCard } from './gx-card';

describe('GxCard', () => {
  let component: GxCard;
  let fixture: ComponentFixture<GxCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GxCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GxCard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
