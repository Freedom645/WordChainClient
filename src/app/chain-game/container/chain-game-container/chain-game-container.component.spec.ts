import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChainGameContainerComponent } from './chain-game-container.component';

describe('ChainGameContainerComponent', () => {
  let component: ChainGameContainerComponent;
  let fixture: ComponentFixture<ChainGameContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChainGameContainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChainGameContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
