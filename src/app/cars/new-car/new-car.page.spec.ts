import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewCarPage } from './new-car.page';

describe('NewCarPage', () => {
  let component: NewCarPage;
  let fixture: ComponentFixture<NewCarPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewCarPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewCarPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
