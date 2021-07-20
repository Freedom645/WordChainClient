import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NowWordComponent } from './now-word.component';

describe('NowWordComponent', () => {
  let component: NowWordComponent;
  let fixture: ComponentFixture<NowWordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NowWordComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NowWordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
