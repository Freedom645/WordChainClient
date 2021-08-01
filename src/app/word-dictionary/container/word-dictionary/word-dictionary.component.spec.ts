import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WordDictionaryComponent } from './word-dictionary.component';

describe('WordDictionaryComponent', () => {
  let component: WordDictionaryComponent;
  let fixture: ComponentFixture<WordDictionaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WordDictionaryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WordDictionaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
