import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeFirstTimePasswordComponent } from './change-first-time-password.component';

describe('ChangeFirstTimePasswordComponent', () => {
  let component: ChangeFirstTimePasswordComponent;
  let fixture: ComponentFixture<ChangeFirstTimePasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ChangeFirstTimePasswordComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChangeFirstTimePasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
