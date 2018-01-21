import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GetpostComponent } from './getpost.component';

describe('GetpostComponent', () => {
  let component: GetpostComponent;
  let fixture: ComponentFixture<GetpostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GetpostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GetpostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
