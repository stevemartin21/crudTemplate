import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddWorkOutComponent } from './add-work-out.component';

describe('AddWorkOutComponent', () => {
  let component: AddWorkOutComponent;
  let fixture: ComponentFixture<AddWorkOutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddWorkOutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddWorkOutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
