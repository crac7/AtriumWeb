import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FaltasAtrasosInspComponent } from './FaltasAtrasosInsp.component.ts';

describe('FaltasAtrasosInspComponent', () => {
  let component: FaltasAtrasosInspComponent;
  let fixture: ComponentFixture<FaltasAtrasosInspComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FaltasAtrasosInspComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FaltasAtrasosInspComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
