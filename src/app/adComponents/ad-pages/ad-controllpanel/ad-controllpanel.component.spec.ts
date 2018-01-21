import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdControllpanelComponent } from './ad-controllpanel.component';

describe('AdControllpanelComponent', () => {
  let component: AdControllpanelComponent;
  let fixture: ComponentFixture<AdControllpanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdControllpanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdControllpanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
