import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionsProjectComponent } from './actions-project.component';

describe('ActionsProjectComponent', () => {
  let component: ActionsProjectComponent;
  let fixture: ComponentFixture<ActionsProjectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActionsProjectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActionsProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
