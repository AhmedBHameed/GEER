import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdSettingComponent } from './ad-setting.component';

describe('AdSettingComponent', () => {
  let component: AdSettingComponent;
  let fixture: ComponentFixture<AdSettingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdSettingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
