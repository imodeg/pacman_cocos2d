class SpriteAnimated extends cc.Sprite
{
  constructor()
  {
    super();

    this.animationsArray = [];
    this.currentAnimation = 'idle';
    this.currentFrame = 0;
    this.isStoped = true;

    //let url = cc.url.raw('resources/block.png');
    //let texture = cc.textureCache.addImage(url);
    //let frame = new cc.SpriteFrame(texture);
    //this.spriteFrame = frame;
    //this.animationsArray['idle'] = {};
    //this.animationsArray['idle'].speed = 1;
    //this.animationsArray['idle'].spriteFrames = [];
    //this.animationsArray['idle'].spriteFrames.push(frame);
  }

  start()
  {
    this.isStoped = true;
    let action1 = cc.delayTime(0.2);
    let action2 = cc.callFunc(() =>
    {
      this.nextFrame();
    }, this);
    this.node.runAction(cc.repeatForever(cc.sequence(action2, action1)));
  }

  pause()
  {
    this.isStoped = true;
  }

  play()
  {
    this.isStoped = false;
  }

  addAnimation(animationName, speed, imgsPathArray)
  {
    this.animationsArray[animationName] = {};
    this.animationsArray[animationName].speed = speed;
    this.animationsArray[animationName].spriteFrames = [];
    let url;
    let texture;
    let frame;
    for(let i = 0; i < imgsPathArray.length; i++)
    {
      url = cc.url.raw(imgsPathArray[i]);
      texture = cc.textureCache.addImage(url);
      frame = new cc.SpriteFrame(texture);
      this.animationsArray[animationName].spriteFrames.push(frame);

      url = cc.url.raw(imgsPathArray[i]);
      texture = cc.textureCache.addImage(url);
      frame = new cc.SpriteFrame(texture);
      this.animationsArray[animationName].spriteFrames.push(frame);
    }
  }

  setAnimation(animationName)
  {
    this.isStoped = false;
    this.currentAnimation = animationName;
    this.currentFrame = 0;
    this.spriteFrame = this.animationsArray[this.currentAnimation].spriteFrames[0];
  }

  nextFrame()
  {
    if(!this.isStoped)
    {
      this.currentFrame++;
      if(this.currentFrame >= this.animationsArray[this.currentAnimation].spriteFrames.length)
      {
        this.currentFrame = 0;
      }

      this.spriteFrame = this.animationsArray[this.currentAnimation].spriteFrames[this.currentFrame];
    }
  }

  update()
  {

  }
}

module.exports.SpriteAnimated = SpriteAnimated;
