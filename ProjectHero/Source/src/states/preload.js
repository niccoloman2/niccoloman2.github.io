

class Preload extends Phaser.State {
  create() {
    let icon = this.game.add.image(this.game.world.centerX, this.game.world.centerY - 200, 'icon_loading');
    icon.anchor.set(0.5, 0.5);
    icon.scale.set(0.5);

    let barBG = this.game.add.image(this.game.world.centerX, this.game.world.centerY + 200, 'bar_loading_bg');
    barBG.anchor.set(0.5, 0.5);

    let barFG = barBG.addChild(this.game.make.image(-barBG.width / 2, 0, 'bar_loading_fg'));
    barFG.anchor.set(0, 0.5);

    let barText = barBG.addChild(this.game.add.text(0, 4, 'LOADING'));
    barText.anchor.set(0.5, 0.5);
    barText.y = 200;
    barText.addColor('#ffffff', 0);

    this.game.load.setPreloadSprite(barFG, 0);
    this.game.load.onLoadComplete.add(this.loadComplete, this);

    this.game.load.image('title_text', 'res/img/TitleText.png');
    this.game.load.bitmapFont('bmFont', 'res/fonts/basicFOnt.png', 'res/fonts/basicFOnt.xml');
    this.game.load.image('skyBG', 'res/img/sky.png');
    this.game.load.image('textBox', 'res/img/textBox.png');
    this.game.load.image('npc', 'res/img/guideFace.png');
    this.game.load.image('cursor', 'res/img/dialogueCursor.png');

    this.game.load.image('johnCena', 'res/img/johnCena.jpg');
    this.game.load.audio('johnCenaBGM', 'res/audio/johnCenaBGM.mp3');

    this.game.load.audio('mainBGM', 'res/audio/bgm.ogg');

    this.game.load.audio('proceed', 'res/audio/Proceed.wav');
    this.game.load.audio('dialogueBeep', 'res/audio/dialogueBeep.wav');

    

    this.game.load.start();
  }

  loadComplete() {
    this.game.state.start('title');

  }
}

export default Preload;
