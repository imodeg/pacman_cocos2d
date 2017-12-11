let gameCfg = require('GameConstants').gameCfg;
let Block = require('Block').Block;
let Player = require('Player').Player;
let Dot = require('Dot').Dot;
let BigDot = require('Dot').BigDot;
let Enemy = require('Enemy').Enemy;

class Map extends cc.Node
{
  constructor(parent, gameComponent)
  {
    super("map");
    this.parent = parent;
    this.gameComponent = gameComponent;
    //this.x = x;
    //this.y = y;

    this.enemyArray = [];
    this.dotsCount = 0;

    this.levelArray = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0],
    [0, 0, 1, 3, 3, 3, 3, 3, 3, 3, 3, 1, 3, 3, 3, 3, 3, 3, 3, 3, 1, 0, 0],
    [0, 0, 1, 3, 1, 1, 3, 1, 1, 1, 3, 1, 3, 1, 1, 1, 3, 1, 1, 3, 1, 0, 0],
    [0, 0, 1, 4, 1, 1, 3, 1, 1, 1, 3, 1, 3, 1, 1, 1, 3, 1, 1, 4, 1, 0, 0],
    [0, 0, 1, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 1, 0, 0],
    [0, 0, 1, 3, 1, 1, 3, 1, 3, 1, 1, 1, 1, 1, 3, 1, 3, 1, 1, 3, 1, 0, 0],
    [0, 0, 1, 3, 3, 3, 3, 1, 3, 3, 3, 1, 3, 3, 3, 1, 3, 3, 3, 3, 1, 0, 0],
    [0, 0, 1, 1, 1, 1, 3, 1, 1, 1, 3, 1, 3, 1, 1, 1, 3, 1, 1, 1, 1, 0, 0],
    [0, 0, 1, 0, 0, 1, 3, 1, 3, 3, 3, 3, 3, 3, 3, 1, 3, 1, 0, 0, 1, 0, 0],
    [0, 0, 1, 1, 1, 1, 3, 1, 3, 1, 1, 0, 1, 1, 3, 1, 3, 1, 1, 1, 1, 0, 0],
    [0, 0, 0, 3, 3, 3, 3, 3, 3, 1, 5, 5, 5, 1, 3, 3, 3, 3, 3, 3, 0, 0, 0],
    [0, 0, 1, 1, 1, 1, 3, 1, 3, 1, 1, 1, 1, 1, 3, 1, 3, 1, 1, 1, 1, 0, 0],
    [0, 0, 1, 0, 0, 1, 3, 1, 3, 3, 3, 3, 3, 3, 3, 1, 3, 1, 0, 0, 1, 0, 0],
    [0, 0, 1, 1, 1, 1, 3, 1, 3, 1, 1, 1, 1, 1, 3, 1, 3, 1, 1, 1, 1, 0, 0],
    [0, 0, 1, 3, 3, 3, 3, 3, 3, 3, 3, 1, 3, 3, 3, 3, 3, 3, 3, 3, 1, 0, 0],
    [0, 0, 1, 3, 1, 1, 3, 1, 1, 1, 3, 1, 3, 1, 1, 1, 3, 1, 1, 3, 1, 0, 0],
    [0, 0, 1, 4, 3, 1, 3, 3, 3, 3, 3, 2, 3, 3, 3, 3, 3, 1, 3, 4, 1, 0, 0],
    [0, 0, 1, 1, 3, 1, 3, 1, 3, 1, 1, 1, 1, 1, 3, 1, 3, 1, 3, 1, 1, 0, 0],
    [0, 0, 1, 3, 3, 3, 3, 1, 3, 3, 3, 1, 3, 3, 3, 1, 3, 3, 3, 3, 1, 0, 0],
    [0, 0, 1, 3, 1, 1, 1, 1, 1, 1, 3, 1, 3, 1, 1, 1, 1, 1, 1, 3, 1, 0, 0],
    [0, 0, 1, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 1, 0, 0],
    [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    ];

    this.entitiesArray = [];
    for(var i = 0; i < this.levelArray[0].length; i++)
    {
      this.entitiesArray.push(new Array(this.levelArray.length));
    }

    this.levelPosX = (gameCfg.cellSize * this.levelArray[0].length)/2 -gameCfg.cellSize/2;
    this.levelPosY = (gameCfg.cellSize * this.levelArray.length)/2 -gameCfg.cellSize/2;

    this.parseLevel(this.levelArray);
    this.start();


    this.winImage = new cc.Node('winimage');
    this.winImage.parent = this;
    let sprite = this.winImage.addComponent(cc.Sprite);
    let url = cc.url.raw("resources/winner.png");
    let texture = cc.textureCache.addImage(url);
    sprite.spriteFrame = new cc.SpriteFrame(texture);
    this.winImage.anchorX = 0.5;
    this.winImage.anchorY = 0.5;
    this.winImage.zIndex = 2;
    this.winImage.opacity = 0;
  }

  addScore(count)
  {
    this.gameComponent.score += count;
    this.gameComponent.scoreCounter.string = this.gameComponent.score.toString();
  }

  checkForWin()
  {
    if(this.dotsCount <= 0)
    {
      this.winImage.opacity = 255;
      let url = cc.url.raw("resources/Pacman-win.mp3");
      cc.audioEngine.playEffect(url);
      this.player.stop();

      for(let i = 0; i < this.enemyArray.length; i++)
      {
        this.enemyArray[i].stop();
      }

      let action1 = cc.delayTime(1.8);
      let action2 = cc.callFunc(() =>
      {
        this.gameComponent.restartFull();
      }, this);
      this.runAction(cc.sequence(action1, action2));
    }
  }

  start() //start level
  {
    let url = cc.url.raw("resources/Pacman-sound.mp3");
    cc.audioEngine.playEffect(url);
    let action1 = cc.delayTime(4);
    let action2 = cc.callFunc(() =>
    {
      this.player.start();
      for(let i = 0; i < this.enemyArray.length; i++)
      {
        this.enemyArray[i].start();
      }
    }, this);
    this.runAction(cc.sequence(action1, action2));
  }

  stop()
  {
    for(let i = 0; i < this.enemyArray.length; i++)
    {
      this.enemyArray[i].stop();
    }

    let action1 = cc.delayTime(3);
    let action2 = cc.callFunc(() =>
    {
      this.restart();
    }, this);
    this.runAction(cc.sequence(action1, action2));
  }

  restart()
  {
    this.player.restart();
    for(let i = 0; i < this.enemyArray.length; i++)
    {
      this.enemyArray[i].restart();
    }
    this.start();
  }

  parseLevel(levelArray)
  {
    for(let posY = 0; posY < levelArray.length; posY++)
    {
      for(let posX = 0; posX < levelArray[posY].length; posX++)
      {
        switch(levelArray[posY][posX])
        {
            case 1:
              let block = this.createBlock(posX, posY);
              this.entitiesArray[posX][posY] = block;
              break;
            case 2:
              this.player = new Player(this, this.getVecFromCellPos(posX, posY).x, this.getVecFromCellPos(posX, posY).y);
              break;
            case 3:
              let dot = new Dot(this, this.getVecFromCellPos(posX, posY).x, this.getVecFromCellPos(posX, posY).y, posX, posY);
              this.entitiesArray[posX][posY] = dot;
              this.dotsCount++;
              break;
            case 4:
              let bigdot = new BigDot(this, this.getVecFromCellPos(posX, posY).x, this.getVecFromCellPos(posX, posY).y, posX, posY);
              this.entitiesArray[posX][posY] = bigdot;
              this.dotsCount++;
              break;
            case 5:
              let enemy = new Enemy(this, this.getVecFromCellPos(posX, posY).x, this.getVecFromCellPos(posX, posY).y, posX, posY);
              this.enemyArray.push(enemy);
              break;
        }
      }
    }
    console.log(this.entitiesArray);
  }

  getVecFromCellPos(posX, posY)
  {
    let vec = {};
    vec.x = -this.levelPosX+gameCfg.cellSize*posX;
    vec.y = this.levelPosY+gameCfg.cellSize*-posY;
    return vec;
  }

  createBlock(posX, posY)
  {
    let block = new Block(this, this.getVecFromCellPos(posX, posY).x, this.getVecFromCellPos(posX, posY).y, posX, posY);
    let top = this.levelArray[posY-1][posX];
    if(top != 1)
    {
      top = 0;
    }

    let right = this.levelArray[posY][posX+1];
    if(right != 1)
    {
      right = 0;
    }

    let bottom = this.levelArray[posY+1][posX];
    if(bottom != 1)
    {
      bottom = 0;
    }

    let left = this.levelArray[posY][posX-1];
    if(left != 1)
    {
      left = 0;
    }

    let imageCode = top.toString() + right.toString() + bottom.toString() + left.toString();
    switch(imageCode)
    {
        case '0000':
            block.setImage('resources/block1.png');
          break;
        case '1000':
            block.setImage('resources/block2.png');
            block.rotation = -90;
          break;
        case '0100':
            block.setImage('resources/block2.png');
            //block.rotation = -90;
          break;
        case '0010':
            block.setImage('resources/block2.png');
            block.rotation = 90;
          break;
        case '0001':
            block.setImage('resources/block2.png');
            block.rotation = 180;
          break;
        case '1100':
            block.setImage('resources/block4.png');
            block.rotation = -90;
          break;
        case '0110':
            block.setImage('resources/block4.png');
            //block.rotation = -90;
          break;
        case '0011':
            block.setImage('resources/block4.png');
            block.rotation = 90;
          break;
        case '1001':
            block.setImage('resources/block4.png');
            block.rotation = 180;
          break;
        case '1110':
            block.setImage('resources/block5.png');
            block.rotation = -90;
          break;
        case '0111':
            block.setImage('resources/block5.png');
            //block.rotation = -90;
          break;
        case '1011':
            block.setImage('resources/block5.png');
            block.rotation = 90;
          break;
        case '1101':
            block.setImage('resources/block5.png');
            block.rotation = 180;
          break;
        case '1111':
            block.setImage('resources/block6.png');
            //block.rotation = 180;
          break;
        case '1010':
            block.setImage('resources/block3.png');
            block.rotation = -90;
          break;
        case '0101':
            block.setImage('resources/block3.png');
            //block.rotation = -90;
          break;

    }
    return block;
  }

  getCellPosFromCoordinates(x, y)
  {
    x += gameCfg.cellSize/2;
    let posX = Math.floor(x/gameCfg.cellSize)+Math.floor(this.levelArray[0].length/2);
    let posY = -(Math.floor(y/gameCfg.cellSize)-Math.floor(this.levelArray.length/2)+1);
    let vec = {};
    vec.posX = posX;
    vec.posY = posY;
    return vec;
  }

  startSuper()
  {
    for(let i = 0; i < this.enemyArray.length; i++)
    {
      this.enemyArray[i].sprite.setAnimation('runAttackable');
    }
    let action1 = cc.delayTime(3);
    let action2 = cc.callFunc(() =>
    {
      this.player.isSuper = false;
      for(let i = 0; i < this.enemyArray.length; i++)
      {
        this.enemyArray[i].sprite.setAnimation('run');
      }
    }, this);
    this.runAction(cc.sequence(action1, action2));
  }

  update(dt)
  {
    this.player.update(dt);
    for(let i = 0; i < this.enemyArray.length; i++)
    {
      this.enemyArray[i].update(dt);
    }
  }
}

module.exports.Map = Map;
