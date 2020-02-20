import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionsPlotComponent } from './actions-plot.component';

describe('ActionsPlotComponent', () => {
  let component: ActionsPlotComponent;
  let fixture: ComponentFixture<ActionsPlotComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActionsPlotComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActionsPlotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
