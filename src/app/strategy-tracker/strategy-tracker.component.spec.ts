import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StrategyTrackerComponent } from './strategy-tracker.component';

describe('StrategyTrackerComponent', () => {
  let component: StrategyTrackerComponent;
  let fixture: ComponentFixture<StrategyTrackerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StrategyTrackerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StrategyTrackerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
