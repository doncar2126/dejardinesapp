import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewZonePage } from './new-zone.page';

describe('NewZonePage', () => {
  let component: NewZonePage;
  let fixture: ComponentFixture<NewZonePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewZonePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewZonePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
