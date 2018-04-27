import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';

/**
 * Phaser component. Instantiates a [Phaser game instance]{@link https://photonstorm.github.io/phaser3-docs/Phaser.Game.html} and contains
 * the corresponding [HTMLCanvasElement]{@link https://photonstorm.github.io/phaser3-docs/Phaser.Game.html#canvas}.
 */
@Component({
  // tslint:disable component-selector
  selector: 'phaser-component',
  template: ``
})
export class PhaserComponent implements AfterViewInit, OnDestroy, OnInit {
  /**
   * [Phaser game configuration]{@link https://photonstorm.github.io/phaser3-docs/global.html#GameConfig} input. Note that the 'parent'
   * configuration property is ignored.
   */
  @Input() public gameConfig: any;

  /**
   * Game ready output - emits the [Phaser game instance]{@link https://photonstorm.github.io/phaser3-docs/Phaser.Game.html} when it is
   * ready and this component's view has initialized.
   */
  @Output() public readonly gameReady = new EventEmitter();

  /**
   * [Phaser]{@link https://photonstorm.github.io/phaser3-docs/Phaser.html} module reference. This should provide access to the Phaser API.
   */
  @Input() public Phaser: any;

  /**
   * [Phaser game]{@link https://photonstorm.github.io/phaser3-docs/Phaser.Game.html} reference. Instantiated in
   * [ngOnInit]{@link PhaserComponent.ngOnInit}.
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
   * Lifecycle hook that is called after a component's view has been fully initialized. Attaches
   * [Phaser game's HTMLCanvasElement]{@link https://photonstorm.github.io/phaser3-docs/Phaser.Game.html#canvas} to DOM when game ready.
   */
  public ngAfterViewInit(): void {
    /** @todo Possible race condition? */
    this.game.events.once('ready', () => {
      this.elementRef.nativeElement.appendChild(this.game.canvas);
      this.elementRef.nativeElement.style.overflow = 'hidden';
      this.gameReady.emit(this.game);
    });
  }

  /**
   * Lifecycle hook that is called when a directive, pipe or service is destroyed. Destroys
   * [Phaser game]{@link https://photonstorm.github.io/phaser3-docs/Phaser.Game.html} instance.
   */
  public ngOnDestroy(): void {
    if (this.game && typeof this.game.destroy === 'function') {
      this.game.destroy(true);
    }
  }

  /**
   * Lifecycle hook that is called after data-bound properties of a directive are initialized. Instantiates
   * [Phaser game]{@link https://photonstorm.github.io/phaser3-docs/Phaser.Game.html} instance.
   *
   * @throws [ReferenceError]{@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/ReferenceError} if
   * [Phaser]{@link https://photonstorm.github.io/phaser3-docs/Phaser.html} or
   * [Phaser.Game]{@link https://photonstorm.github.io/phaser3-docs/Phaser.Game.html} are not available.
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
