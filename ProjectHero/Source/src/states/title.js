
class Title extends Phaser.State {
  create() {

    this.titleText = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY - 200, 'title_text');
    this.titleText.anchor.set(0.5, 0.5);

    this.tapText = this.game.add.bitmapText(this.game.world.centerX, this.game.world.centerY + 300, 'bmFont', 'Tap To Begin', 48);
    this.tapText.anchor.set(0.5, 0.5);
    this.tapText.alpha = 0;

    this.fadeTween = this.game.add.tween(this.tapText).to({alpha:1}, 500, Phaser.Easing.Default, true, 500, -1, true);

    this.game.time.events.add(500, this.allowTap, this);

    this.proceedSFX = this.game.add.audio('proceed');
    
  }

  allowTap()
  {
    this.game.input.onTap.add(this.startGameplay, this);
  }



  startGameplay() {

    this.proceedSFX.play();
    this.game.state.start('gameplay');
    
  }

}

export default Title;
