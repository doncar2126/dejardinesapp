import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IndividualsPage } from './individuals.page';

describe('IndividualsPage', () => {
  let component: IndividualsPage;
  let fixture: ComponentFixture<IndividualsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IndividualsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndividualsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
