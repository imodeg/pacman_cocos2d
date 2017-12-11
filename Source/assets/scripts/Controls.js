class Controls
{
  constructor()
  {
    this.isActive = false;
    this.isUpPressed = false;
    this.isDownPressed = false;
    this.isLeftPressed = false;
    this.isRightPressed = false;
  }

  cons()
  {
    console.log('tesst');
  }

  controlsEnable()
  {
    this.isActive = true;
    cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
    cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
  }

  controlsDisable()
  {
    this.isActive = false;
    cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
    cc.systemEvent.off(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
    this.isUpPressed = false;
    this.isDownPressed = false;
    this.isLeftPressed = false;
    this.isRightPressed = false;
  }

  onKeyDown(event)
  {
    switch(event.keyCode)
    {
        case cc.KEY.a:
        case cc.KEY.left:
          this.isLeftPressed = true;
          break;
        case cc.KEY.d:
        case cc.KEY.right:
          this.isRightPressed = true;
          break;
        case cc.KEY.w:
        case cc.KEY.up:
          this.isUpPressed = true;
          break;
        case cc.KEY.s:
        case cc.KEY.down:
          this.isDownPressed = true;
          break;
    }
  }

  onKeyUp(event)
  {
    switch(event.keyCode)
    {
        case cc.KEY.a:
        case cc.KEY.left:
          this.isLeftPressed = false;
          break;
        case cc.KEY.d:
        case cc.KEY.right:
          this.isRightPressed = false;
          break;
        case cc.KEY.w:
        case cc.KEY.up:
          this.isUpPressed = false;
          break;
        case cc.KEY.s:
        case cc.KEY.down:
          this.isDownPressed = false;
          break;
    }
  }
}
let controls = new Controls();

module.exports.controls = controls;
