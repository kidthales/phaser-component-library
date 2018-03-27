import { Phaser3Module } from './phaser3.module';

describe('Phaser3Module', () => {
  let phaser3Module: Phaser3Module;

  beforeEach(() => {
    phaser3Module = new Phaser3Module();
  });

  it('should create an instance', () => {
    expect(phaser3Module).toBeTruthy();
  });
});
