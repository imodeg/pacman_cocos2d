let gameCfg = require('GameConstants').gameCfg;

class Block extends cc.Node
{
  constructor(parent, x = 0, y = 0, posX, posY)
  {
    super("block")
    this.sprite = this.addComponent(cc.Sprite);
    this.parent = parent;
    this.x = x;
    this.y = y;
    this.posX = posX;
    this.posY = posY;
    this.group = 'wall';

    let url = cc.url.raw("resources/block3.png");
    let texture = cc.textureCache.addImage(url);
    this.sprite.spriteFrame = new cc.SpriteFrame(texture);
    this.anchorX = 0.5;
    this.anchorY = 0.5;
  }

  setImage(imagePath)
  {
    let url = cc.url.raw(imagePath);
    let texture = cc.textureCache.addImage(url);
    this.sprite.spriteFrame = new cc.SpriteFrame(texture);
  }
}


module.exports.Block = Block;
