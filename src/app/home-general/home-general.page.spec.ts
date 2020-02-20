import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeGeneralPage } from './home-general.page';

describe('HomeGeneralPage', () => {
  let component: HomeGeneralPage;
  let fixture: ComponentFixture<HomeGeneralPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeGeneralPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeGeneralPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
