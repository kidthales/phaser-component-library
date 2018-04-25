import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PhaserComponent } from './phaser.component';

describe('PhaserComponent', () => {
  const PhaserBak = window['Phaser'];

  afterAll(() => window['Phaser'] = PhaserBak);

  beforeEach(async(() => {
    TestBed.configureTestingModule({ declarations: [PhaserComponent] }).compileComponents();
    window['Phaser'] = PhaserBak;
  }));

  it('should instantiate', async(() => {
    const fixture = TestBed.createComponent(PhaserComponent);
    const component = fixture.debugElement.componentInstance;
    expect(component).toBeTruthy();
  }));

  it('should instantiate Phaser.Game instance, on init', async(() => {
    const fixture = TestBed.createComponent(PhaserComponent);
    const component = fixture.debugElement.componentInstance;
    component.Phaser = window['Phaser'];
    spyOn(component.Phaser, 'Game');
    component.ngOnInit();
    expect(component.Phaser.Game).toHaveBeenCalled();
  }));

  it('should append canvas & emit `gameReady` event, after view init', async(() => {
    const fixture = TestBed.createComponent(PhaserComponent);
    const component = fixture.debugElement.componentInstance;
    component.test = 'ready2';
    component.ngOnInit();
    fixture.whenRenderingDone().then(() => {
      const spy = spyOn(component.gameReady, 'emit');
      component.ngAfterViewInit();
      // Kind of hacky but game ready event occurs sometime after view init.
      setTimeout(() => {
        expect(spy).toHaveBeenCalled();
        const compiled = fixture.debugElement.nativeElement;
        expect(compiled.querySelector('canvas')).toBeTruthy();
      }, 1500);
    });
  }));

  it('should throw reference error if Phaser not found', async(() => {
    const fixture = TestBed.createComponent(PhaserComponent);
    const component = fixture.debugElement.componentInstance;
    window['Phaser'] = undefined;
    component.Phaser = undefined;
    expect(() => component.ngOnInit()).toThrow(new ReferenceError('Phaser not found.'));
  }));

  it('should throw reference error if Phaser.Game not found', async(() => {
    const fixture = TestBed.createComponent(PhaserComponent);
    const component = fixture.debugElement.componentInstance;
    window['Phaser'] = undefined;
    component.Phaser = {};
    expect(() => component.ngOnInit()).toThrow(new ReferenceError('Phaser.Game not found.'));
  }));
});
