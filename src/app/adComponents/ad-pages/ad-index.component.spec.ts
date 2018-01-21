import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdIndexComponent } from './ad-index.component';

describe('AdIndexComponent', () => {
  let component: AdIndexComponent;
  let fixture: ComponentFixture<AdIndexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdIndexComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
