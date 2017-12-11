class Dot extends cc.Node
{
  constructor(parent, x = 0, y = 0, posX, posY)
  {
    super("dot")
    this.sprite = this.addComponent(cc.Sprite);
    this.parent = parent;
    this.x = x;
    this.y = y;
    this.posX = posX;
    this.posY = posY;
    this.group = 'dot';

    let url = cc.url.raw("resources/dot.png");
    let texture = cc.textureCache.addImage(url);
    this.sprite.spriteFrame = new cc.SpriteFrame(texture);
    this.anchorX = 0.5;
    this.anchorY = 0.5;
  }
}

class BigDot extends cc.Node
{
  constructor(parent, x = 0, y = 0, posX, posY)
  {
    super("bigdot")
    this.sprite = this.addComponent(cc.Sprite);
    this.parent = parent;
    this.x = x;
    this.y = y;
    this.posX = posX;
    this.posY = posY;
    this.group = 'bigdot';

    let url = cc.url.raw("resources/bigdot.png");
    let texture = cc.textureCache.addImage(url);
    this.sprite.spriteFrame = new cc.SpriteFrame(texture);
    this.anchorX = 0.5;
    this.anchorY = 0.5;
  }
}

module.exports.Dot = Dot;
module.exports.BigDot = BigDot;
