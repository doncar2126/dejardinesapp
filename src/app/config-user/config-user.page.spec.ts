import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigUserPage } from './config-user.page';

describe('ConfigUserPage', () => {
  let component: ConfigUserPage;
  let fixture: ComponentFixture<ConfigUserPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfigUserPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigUserPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
