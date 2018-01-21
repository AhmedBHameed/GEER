/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { LogginComponent } from './loggin.component';

describe('LogginComponent', () => {
  let component: LogginComponent;
  let fixture: ComponentFixture<LogginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LogginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LogginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
