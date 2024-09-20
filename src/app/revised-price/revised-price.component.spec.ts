import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RevisedPriceComponent } from './revised-price.component';

describe('RevisedPriceComponent', () => {
  let component: RevisedPriceComponent;
  let fixture: ComponentFixture<RevisedPriceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RevisedPriceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RevisedPriceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
