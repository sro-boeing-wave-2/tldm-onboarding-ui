import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDefaultBotsComponent } from './add-default-bots.component';

describe('AddDefaultBotsComponent', () => {
  let component: AddDefaultBotsComponent;
  let fixture: ComponentFixture<AddDefaultBotsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddDefaultBotsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddDefaultBotsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
