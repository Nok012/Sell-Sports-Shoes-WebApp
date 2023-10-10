import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddshoeComponent } from './addshoe.component';

describe('AddmenuComponent', () => {
  let component: AddshoeComponent;
  let fixture: ComponentFixture<AddshoeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddshoeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddshoeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
