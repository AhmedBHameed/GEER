import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdAddarticalComponent } from './ad-addartical.component';

describe('AdAddarticalComponent', () => {
  let component: AdAddarticalComponent;
  let fixture: ComponentFixture<AdAddarticalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdAddarticalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdAddarticalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
