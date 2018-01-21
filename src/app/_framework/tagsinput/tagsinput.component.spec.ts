/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { TagsinputComponent } from './tagsinput.component';

describe('TagsinputComponent', () => {
  let component: TagsinputComponent;
  let fixture: ComponentFixture<TagsinputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TagsinputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TagsinputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
