import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionsIndividualComponent } from './actions-individual.component';

describe('ActionsIndividualComponent', () => {
  let component: ActionsIndividualComponent;
  let fixture: ComponentFixture<ActionsIndividualComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActionsIndividualComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActionsIndividualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
