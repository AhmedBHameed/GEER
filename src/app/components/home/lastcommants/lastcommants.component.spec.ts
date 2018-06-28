/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { LastcommantsComponent } from './lastcommants.component';

describe('LastcommantsComponent', () => {
  let component: LastcommantsComponent;
  let fixture: ComponentFixture<LastcommantsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LastcommantsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LastcommantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
