import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImplementStrategyComponent } from './implement-strategy.component';

describe('ImplementStrategyComponent', () => {
  let component: ImplementStrategyComponent;
  let fixture: ComponentFixture<ImplementStrategyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ImplementStrategyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImplementStrategyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
