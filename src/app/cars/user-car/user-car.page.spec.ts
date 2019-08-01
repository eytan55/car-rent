import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserCarPage } from './user-car.page';

describe('UserCarPage', () => {
  let component: UserCarPage;
  let fixture: ComponentFixture<UserCarPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserCarPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserCarPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
