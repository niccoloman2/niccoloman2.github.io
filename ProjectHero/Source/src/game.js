import Boot from './states/boot';
import Preload from './states/preload';
import Title from './states/title';
import Gameplay from './states/gameplay';
import config from './config';
import transition from './plugins/phaser-state-transition.min';


class Game extends Phaser.Game {
  constructor() {
    super(config.gameWidth, config.gameHeight, Phaser.AUTO, 'game');

    this.state.add('boot', Boot);
    this.state.add('preload', Preload);
    this.state.add('title', Title);
    this.state.add('gameplay', Gameplay);

    this.state.start('boot');

  }
}

new Game();
