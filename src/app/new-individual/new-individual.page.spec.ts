import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewIndividualPage } from './new-individual.page';

describe('NewIndividualPage', () => {
  let component: NewIndividualPage;
  let fixture: ComponentFixture<NewIndividualPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewIndividualPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewIndividualPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
