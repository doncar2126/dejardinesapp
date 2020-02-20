import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewHabitatPage } from './new-habitat.page';

describe('NewHabitatPage', () => {
  let component: NewHabitatPage;
  let fixture: ComponentFixture<NewHabitatPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewHabitatPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewHabitatPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
