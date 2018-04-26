import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';

/**
 * Phaser component. Instantiates a Phaser game instance and contains the corresponding HTMLCanvasElement.
 */
@Component({
  // tslint:disable component-selector
  selector: 'phaser-component',
  template: ``
})
export class PhaserComponent implements AfterViewInit, OnDestroy, OnInit {
  /**
   * Phaser game configuration input. Note that the 'parent' configuration property is ignored.
   */
  @Input() public gameConfig: any;

  /**
   * Game ready output - emits the Phaser game instance when it is ready and this component's view has initialized .
   */
  @Output() public readonly gameReady = new EventEmitter();

  /**
   * Phaser module reference. This should provide access to the Phaser API.
   */
  @Input() public Phaser: any;

  /**
   * Phaser game reference. Instantiated in [ngOnInit]{@link PhaserComponent#ngOnInit}.
   */
  private game: any;

  /**
   * Instantiate Phaser component.
   *
   * @param elementRef Reference to host element. Corresponding native element will act as parent to Phaser's HTMLCanvasElement's DOM
   * element.
   */
  public constructor(private elementRef: ElementRef) { }

  /**
   * Lifecycle hook that is called after a component's view has been fully initialized. Attaches Phaser game's HTMLCanvasElement to DOM when
   * game ready.
   */
  public ngAfterViewInit(): void {
    // Possible race condition?
    this.game.events.once('ready', () => {
      this.elementRef.nativeElement.appendChild(this.game.canvas);
      this.elementRef.nativeElement.style.overflow = 'hidden';
      this.gameReady.emit(this.game);
    });
  }

  /**
   * Lifecycle hook that is called when a directive, pipe or service is destroyed. Destroys Phaser game instance.
   */
  public ngOnDestroy(): void {
    if (this.game && typeof this.game.destroy === 'function') {
      this.game.destroy(true);
    }
  }

  /**
   * Lifecycle hook that is called after data-bound properties of a directive are initialized. Instantiates Phaser game instance.
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
