# Phaser Component Library

[![Build Status](https://travis-ci.org/TristanBonsor/phaser-component-library.svg?branch=develop)](https://travis-ci.org/TristanBonsor/phaser-component-library)
[![Coverage Status](https://coveralls.io/repos/github/TristanBonsor/phaser-component-library/badge.svg?branch=master)](https://coveralls.io/github/TristanBonsor/phaser-component-library?branch=develop)

Phaser component for Angular. The purpose of this library is to provide a simple way to integrate Phaser 3 into an Angular project in an agnostic fashion.

## Requirements

- [Phaser 3](https://github.com/photonstorm/phaser)
- [Angular](https://github.com/angular/angular)

## Installation & Integration

Install package:

```bash
$ npm install phaser-component-library --save
```

Integrate module:

```typescript
import { PhaserModule } from 'phaser-component-library';

@NgModule({
  imports: [PhaserModule],
  ...
})
class AppModule {}
```

## Usage

Template usage:

```html
<phaser3-component (gameReady)="onGameReady($event)" [gameConfig]="config" [Phaser]="phaser">
  <!-- Phaser's HTMLCanvasElement will reside here... -->
</phaser3-component>
```

Component usage:

```typescript
/**
 * Assume `Phaser` is attached to global context.
 */
export class AppComponent {
  /**
   * Phaser game configuration.
   */
  public readonly config = {
    type: Phaser.AUTO,
    width: window.innerWidth,
    height: window.innerHeight
    // If not adding scenes to Phaser dynamically, could just declare them here. Or maybe do both...
    //scene: [Some, Other, Scenes]
  };

  /**
   * Phaser API.
   */
  public readonly phaser = Phaser;

  /**
   * Instantiate application component.
   *
   * @param sceneService Scene service - this is an injectable Phaser.Scene sub-class.
   */
  public constructor(public sceneService: SceneService) { }

  /**
   * On game ready event handler. Fired once Phaser game is ready and Angular view is initialized.
   *
   * @param game Game instance.
   */
  public onGameReady(game): void {
    // Dynamically add to Phaser our scene that utilizes Angular DI.
    game.scene.add('Scene', this.sceneService, true);
  }
}
```

Please refer to the example [AppComponent](https://github.com/TristanBonsor/phaser-component-library/blob/develop/src/app/app.component.ts) to see the full sample usage.

## API

### Inputs

**gameConfig: any:** Phaser configuration object. Note that the functionality of this Angular component will result in the `parent` property being ignored.

**Phaser: any:** Phaser API. If not provided, the component will attempt to locate the module on `window`.

### Outputs

**gameReady: any:** Emits Phaser game instance once it's ready & Angular has initialized the view.

### Lifecycle

**ngOnInit(): void:** Instantiates a Phaser.Game instance using configuration input.

**ngAfterViewInit(): void** Binds a single use handler for Phaser game's 'ready' event; appends Phaser canvas to DOM and emits Phaser game instance (via the `gameReady` output) when the game is 'ready'.

## Development

Ensure dependecies are installed: `npm install`.

Run `npm start` for a dev server & automated testing. Navigate to `http://localhost:4200/`. The example app will automatically reload if you change any of the source files.

Run `npm run build` to build the project. The build artifacts will be stored in the `dist/` directory.

Run `npm test` to execute the unit tests for the library (watch mode); use `npm run test:single-run` for a single run execution.

Run `npm run e2e` to execute the end-to-end tests for the example app.

Refer to the project's [package.json](https://github.com/TristanBonsor/phaser-component-library/blob/develop/package.json) `scripts` property for more commands.

## License

[![License](http://img.shields.io/:license-mit-blue.svg?style=flat-square)](https://raw.githubusercontent.com/TristanBonsor/phaser-component-library/develop/LICENSE)

Copyright 2018 © <a href="https://tristanbonsor.github.io/" target="_blank">Tristan Bonsor</a>
