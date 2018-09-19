import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkspacedetailsComponent } from './workspacedetails.component';

describe('WorkspacedetailsComponent', () => {
  let component: WorkspacedetailsComponent;
  let fixture: ComponentFixture<WorkspacedetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkspacedetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkspacedetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
