import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output } from '@angular/core';

/**
 * Phaser 3 component.
 */
@Component({
  // tslint:disable component-selector
  selector: 'phaser3-component',
  template: ``
})
export class Phaser3Component implements AfterViewInit, OnInit {
  /**
   * Game configuration input. Note that 'parent' configuration property is ignored.
   */
  @Input() public gameConfig: any;

  /**
   * Game ready output - emits game instance.
   */
  @Output() public readonly gameReady = new EventEmitter();

  /**
   * Phaser module reference.
   */
  @Input() public Phaser: any;

  /**
   * Game reference.
   */
  private game: any;

  /**
   * Instantiate Phaser 3 component.
   *
   * @param elementRef Reference to host element.
   */
  public constructor(private elementRef: ElementRef) { }

  /**
   * Lifecycle hook that is called after a component's view has been fully initialized.
   */
  public ngAfterViewInit(): void {
    this.game.events.once('ready', () => {
      this.elementRef.nativeElement.appendChild(this.game.canvas);
      this.elementRef.nativeElement.style.overflow = 'hidden';
      this.gameReady.emit(this.game);
    });
  }

  /**
   * Lifecycle hook that is called after data-bound properties of a directive are initialized.
   */
  public ngOnInit(): void {
    // If Phaser module not provided try window object...
    const PhaserModule = this.Phaser || window['Phaser'];

    if (!PhaserModule) {
      throw new ReferenceError('Phaser not found.');
    } else if (!PhaserModule.Game) {
      throw new ReferenceError('Phaser.Game not found.');
    }

    this.game = new PhaserModule.Game(this.gameConfig);
  }
}
