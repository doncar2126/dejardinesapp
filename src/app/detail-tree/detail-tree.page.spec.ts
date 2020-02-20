import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailTreePage } from './detail-tree.page';

describe('DetailTreePage', () => {
  let component: DetailTreePage;
  let fixture: ComponentFixture<DetailTreePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailTreePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailTreePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
