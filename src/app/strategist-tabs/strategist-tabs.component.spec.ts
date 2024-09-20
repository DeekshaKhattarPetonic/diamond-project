import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StrategistTabsComponent } from './strategist-tabs.component';

describe('StrategistTabsComponent', () => {
  let component: StrategistTabsComponent;
  let fixture: ComponentFixture<StrategistTabsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StrategistTabsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StrategistTabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
