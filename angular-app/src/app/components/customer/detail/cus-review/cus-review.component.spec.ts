import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CusReviewComponent } from './cus-review.component';

describe('CusReviewComponent', () => {
  let component: CusReviewComponent;
  let fixture: ComponentFixture<CusReviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CusReviewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CusReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
