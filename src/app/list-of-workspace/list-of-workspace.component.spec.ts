import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOfWorkspaceComponent } from './list-of-workspace.component';

describe('ListOfWorkspaceComponent', () => {
  let component: ListOfWorkspaceComponent;
  let fixture: ComponentFixture<ListOfWorkspaceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListOfWorkspaceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListOfWorkspaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
