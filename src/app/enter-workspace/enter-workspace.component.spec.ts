import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnterWorkspaceComponent } from './enter-workspace.component';

describe('EnterWorkspaceComponent', () => {
  let component: EnterWorkspaceComponent;
  let fixture: ComponentFixture<EnterWorkspaceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnterWorkspaceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnterWorkspaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

});
