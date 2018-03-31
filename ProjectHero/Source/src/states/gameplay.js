class Gameplay extends Phaser.State {
  create() {

    this.bgSprite = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'skyBG');
    this.bgSprite.anchor.set(0.5, 0.5);
    //this.bgSprite.scale.set(7, 7);

    this.textBox = this.game.add.sprite(0, this.game.world.height, 'textBox');
    this.textBox.anchor.set(0, 1);
    this.textBox.scale.set(1.1, 1);
    this.textBox.alpha = 0;

    this.dialogueCursor = this.game.add.sprite(this.game.world.width - 70, this.game.world.height - 70, 'cursor');
    this.dialogueCursor.anchor.set(0.5, 0.5);
    this.dialogueCursor.visible = false;

    this.cursorTween = this.game.add.tween(this.dialogueCursor).to({y:this.game.world.height - 90}, 200, Phaser.Easing.Default, true, 200, -1, true);

    this.guideFace = this.game.add.sprite(10, this.textBox.y - this.textBox.height, 'npc');
    this.guideFace.anchor.set(0, 1);
    this.guideFace.scale.set(3);
    this.guideFace.alpha = 0;

    this.chatText = this.game.add.bitmapText(30, this.textBox.y - this.textBox.height + 70, 'bmFont', '', 60);
    this.chatText.maxWidth = this.textBox.width * 0.8;

    this.heroName = 'Rookie';

    this.proceedSFX = this.game.add.audio('proceed');
    this.beepSFX = this.game.add.audio('dialogueBeep');

    this.bDidJohnCena = false;

    this.professionIdx = 0;

    this.professionComments = ['Niccolo:\n\"Good with a sword? Up close and personal? Love it.\"',
    'Niccolo:\n\"Sneaky sneaky with a good eye for danger? We should play darts sometimes.\"',
    'Niccolo:\n\"Practicioner of the arcane arts eh? You must be really smart!\"'];


    this.textArray = ['???:\n\"Oh hello there. You must be the new recruit.\"',
    '???:\n\"My name is Niccolo. I\'ll be handling your registration.\"',
    'Niccolo:\n\"People have all sorts of reasons to join the Adventurers Guild!\"',
    'Niccolo:\n\"It\'s either fame, fortune, glory, or evil motive.\"',
    'Niccolo:\n\"Did I say \'evil motive\'? I meant uh...\"',
    'Niccolo:\n\"...I\'m excited to see what kind of hero you\'ll become.\"',
    'Niccolo:\n\"Before we begin...I\'m gonna need your name.\"',
    'Niccolo:\n\"...\"',
    'Niccolo:\n\"I\'m sorry. The text input thing is bugged out. I\'m gonna call you Rookie instead.\"',
    'Niccolo:\n\"'+ this.heroName+'? That\'s got quite a ring to it.',
    'Niccolo:\n\"Nice to meet ya, ' + this.heroName + '! You look like you\'re gonna be quite the adventurer!\"',
    'Niccolo:\n\"Alright! Registration is supposed to be quick. We need one last thing...because this is a prototype...\"',
    'Niccolo:\n\"...there isn\'t much character customization other than name and job class.\"',
    'Niccolo:\n\"So...what\'s your specialty?\"',
    'Niccolo:\n\"...\"',
    'Niccolo:\n\"Job class selection is bugged out too huh? Guess you\'re a warrior for now then.\"',
    'Niccolo:\n\"The core mechanics should be good though. That\'s the most important part after all.',
    'Niccolo:\n\"Alright. We\'re pretty much done here.\"',
    'Niccolo:\n\"I\'m actually not your tutorial guy. I just handle registration.\"',
    'Niccolo:\n\"I\'ll introduce you to the trainer. He\'s got quite the reputation in the guild...\"'];

    this.textIdx = 0;

    this.gameBGM = this.game.add.audio('mainBGM');
    this.gameBGM.loopFull();

    var textBoxFade = this.game.add.tween(this.textBox).to({alpha:1}, 250, Phaser.Easing.Default, true, 500);
    var faceFade = this.game.add.tween(this.guideFace).to({alpha:1}, 500, Phaser.Easing.Default, true, 650);

    this.game.time.events.add(700, function(){
      this.showText();
      this.game.input.onTap.add(this.onTap, this);
    }, this);

    this.johnCena = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'johnCena');
    this.johnCena.anchor.set(0.5, 0.5);
    this.johnCena.visible = false;

    this.johnCenaBGM = this.game.add.audio('johnCenaBGM');

    this.aprilFoolsText = this.game.add.bitmapText(this.game.world.centerX, this.game.world.height - 90, 'bmFont', 'APRIL FOOLS YO', 72);
    this.aprilFoolsText.anchor.set(0.5, 0);
    this.aprilFoolsText.visible = false;

    this.bIsTyping = false;
    this.blockTap = true;

    this.charIdx = 0;

    this.messagePrompt = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'textBox');
    this.messagePrompt.anchor.set(0.5, 0.5);
    this.messagePrompt.visible = false;


  }

  showNameInput()
  {

  }

  refreshDialogue()
  {
    this.heroName = 'Rookie';
    this.professionIdx = 2;

    this.textArray = ['???:\n\"Oh hello there. You must be the new recruit.\"',
    '???:\n\"My name is Niccolo. I\'ll be handling your registration.\"',
    'Niccolo:\n\"People have all sorts of reasons to join the Adventurers Guild!\"',
    'Niccolo:\n\"It\'s either fame, fortune, glory, or evil motive.\"',
    'Niccolo:\n\"Did I say \'evil motive\'? I meant uh...\"',
    'Niccolo:\n\"...I\'m excited to see what kind of hero you\'ll become.\"',
    'Niccolo:\n\"Before we begin...I\'m gonna need your name.\"',
    'Niccolo:\n\"'+ this.heroName+'? That\'s got quite a ring to it.',
    'Niccolo:\n\"Nice to meet ya, ' + this.heroName + '! You look like you\'re gonna be quite the adventurer!\"',
    'Niccolo:\n\"Alright! Registration is supposed to be quick. We need one last thing...because this is a prototype...\"',
    'Niccolo:\n\"...there isn\'t much character customization other than name and job class.\"',
    'Niccolo:\n\"So...what\'s your specialty?\"',
    this.professionComments[this.professionIdx],
    'Niccolo:\n\"Alright. We\'re pretty much done here.\"',
    'Niccolo:\n\"I\'m actually not your tutorial guy. I just handle registration.\"',
    'Niccolo:\n\"I\'ll introduce you to the trainer. He\'s got quite the reputation in the guild...\"'];
  }

  showText()
  {
    if(!this.bIsTyping)
    {
      this.blockTap = true;
      this.bIsTyping = true;

      this.charIdx = 0;

      this.dialogueCursor.visible = false;

      var stringToDisplay = this.textArray[this.textIdx];
      this.chatText.text = '';

      //this.game.time.events.repeat(delay, repeatCount, callback, callbackContext, arguments);

      this.game.time.events.repeat(25, stringToDisplay.length, function(){
        this.beepSFX.play();
        this.chatText.text += this.textArray[this.textIdx].charAt(this.charIdx);
        this.charIdx++;

        if(this.charIdx >= this.textArray[this.textIdx].length)
        {
          this.onTextComplete();
        }
      }, this);

    }
    //this.chatText.text = this.textArray[this.textIdx];
  }

  onTextComplete()
  {
    this.blockTap = false;
    this.bIsTyping = false;
    this.dialogueCursor.visible = true;
  }

  onTap()
  {
    if(this.bDidJohnCena || this.blockTap)
    {
      return;
    }
    
    if(this.textIdx < 19)
    {
      this.textIdx++;
      this.proceedSFX.play();
      this.showText();
    }
    else
    {
      this.showJohnCena();
    }

    
  }

  showJohnCena()
  {
    this.bDidJohnCena = true;
    this.gameBGM.stop();
    this.johnCenaBGM.loopFull();
    this.johnCena.visible = true;
    this.aprilFoolsText.visible = true;
  }

  
}

export default Gameplay;
