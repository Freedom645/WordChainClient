import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrefixPageComponent } from './prefix-page.component';

describe('PrefixPageComponent', () => {
  let component: PrefixPageComponent;
  let fixture: ComponentFixture<PrefixPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrefixPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrefixPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
