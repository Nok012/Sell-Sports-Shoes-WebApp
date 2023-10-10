import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditShoeComponent } from './edit-shoe.component';

describe('EditShoeComponent', () => {
  let component: EditShoeComponent;
  let fixture: ComponentFixture<EditShoeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditShoeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditShoeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
