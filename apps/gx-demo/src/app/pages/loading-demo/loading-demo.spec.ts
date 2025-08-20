import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadingDemo } from './loading-demo';

describe('LoadingDemo', () => {
  let component: LoadingDemo;
  let fixture: ComponentFixture<LoadingDemo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoadingDemo]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoadingDemo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
