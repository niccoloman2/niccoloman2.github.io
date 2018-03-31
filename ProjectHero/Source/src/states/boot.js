

class Boot extends Phaser.State {
  preload() {
  	this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
  	this.game.scale.setShowAll();
    this.game.scale.pageAlignHorizontally = true;
    this.game.scale.pageAlignVertically = true;
    this.game.scale.refresh();
  	
    this.game.load.image('icon_loading', 'res/img/LoadingRune.png');
    this.game.load.image('bar_loading_bg', 'res/img/bar_loading_bg.png');
    this.game.load.image('bar_loading_fg', 'res/img/bar_loading_fg.png');
  }

  create() {
    this.game.stage.backgroundColor = '#000000';
    this.game.state.start('preload');
  }
}

export default Boot;
