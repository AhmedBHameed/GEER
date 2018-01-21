/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { RegesterComponent } from './regester.component';

describe('RegesterComponent', () => {
  let component: RegesterComponent;
  let fixture: ComponentFixture<RegesterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegesterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegesterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
