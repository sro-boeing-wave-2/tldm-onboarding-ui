import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvitedUserVerificationComponent } from './invited-user-verification.component';

describe('InvitedUserVerificationComponent', () => {
  let component: InvitedUserVerificationComponent;
  let fixture: ComponentFixture<InvitedUserVerificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvitedUserVerificationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvitedUserVerificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
