/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AdAllarticalsComponent } from './ad-allarticals.component';

describe('AdAllarticalComponent', () => {
  let component: AdAllarticalsComponent;
  let fixture: ComponentFixture<AdAllarticalsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdAllarticalsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdAllarticalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
