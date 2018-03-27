import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Phaser3Component } from './phaser3.component';

describe('Phaser3Component', () => {
  let component: Phaser3Component;
  let fixture: ComponentFixture<Phaser3Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Phaser3Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Phaser3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
