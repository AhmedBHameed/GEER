import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdCategoriesComponent } from './ad-categories.component';

describe('AdCategoriesComponent', () => {
  let component: AdCategoriesComponent;
  let fixture: ComponentFixture<AdCategoriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdCategoriesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
