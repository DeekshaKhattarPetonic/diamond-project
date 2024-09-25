import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewChangesNewComponent } from './review-changes-new.component';

describe('ReviewChangesNewComponent', () => {
  let component: ReviewChangesNewComponent;
  let fixture: ComponentFixture<ReviewChangesNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReviewChangesNewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReviewChangesNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
