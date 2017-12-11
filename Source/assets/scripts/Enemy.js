let gameCfg = require('GameConstants').gameCfg;
let SpriteAnimated = require('SpriteAnimated').SpriteAnimated;

class Enemy extends cc.Node
{
  constructor(parent, x = 0, y = 0)
  {
    super('enemy');
    this.sprite = this.addComponent(SpriteAnimated);
    this.map = parent;
    this.parent = parent;
    this.startX = x;
    this.startY = y;
    this.x = x;
    this.y = y;
    this.group = 'enemy';

    this.isActive = false;
    this.isStoped = false;
    this.lastMove = 'none';
    this.moveTime = 0.5;
    this.isEatible = true;


    this.sprite.addAnimation('idle', 1, ['resources/ghost_red_right1.png']);
    this.sprite.addAnimation('run', 1, ['resources/ghost_red_right1.png', 'resources/ghost_red_right2.png']);
    this.sprite.addAnimation('runLeft', 1, ['resources/ghost_red_left1.png', 'resources/ghost_red_left2.png']);
    this.sprite.addAnimation('runAttackable', 1, ['resources/ghost_attackable1.png', 'resources/ghost_attackable2.png']);
    this.sprite.addAnimation('runDeath', 1, ['resources/ghost_dead1.png', 'resources/ghost_dead2.png']);
    this.sprite.setAnimation('run');
    this.sprite.start();
    this.sprite.play();

    this.anchorX = 0.5;
    this.anchorY = 0.5;
    this.zIndex = 1;
  }

  start()
  {
    this.isStoped = false;
    this.sprite.play();
    this.isActive = true;
  }

  stop()
  {
    this.isStoped = true;
    this.isActive = false;
  }

  restart()
  {
    this.sprite.setAnimation('run');
    this.x = this.startX;
    this.y = this.startY;
    this.stop();
    this.isEatible = true;
  }

  death()
  {
    this.isEatible = false;
    this.stop();
    this.sprite.setAnimation('runDeath');
    let stopAction1 = cc.delayTime(0.5);
    let stopAction2 = cc.callFunc(() =>
    {
      this.x = this.startX;
      this.y = this.startY;
    }, this);
    this.runAction(cc.sequence(stopAction1, stopAction2));

    let action1 = cc.delayTime(2);
    let action2 = cc.callFunc(() =>
    {
      this.sprite.setAnimation('run');
      this.restart();
      this.start();
      this.isEatible = true;
    }, this);
    this.runAction(cc.sequence(action1, action2));
  }

  update(dt)
  {
    this.enemyPos = this.map.getCellPosFromCoordinates(this.x, this.y);

    if(this.isActive)
    {
      this.moveDecide(this.enemyPos.posX, this.enemyPos.posY);
      this.isActive = false;
    }

    if(this.enemyPos.posX <= 1)
    {
      this.x = this.map.getVecFromCellPos(this.map.levelArray[0].length-3, 0).x +(gameCfg.cellSize/2);
    }

    if(this.enemyPos.posX >= this.map.levelArray[0].length-2)
    {
      this.x = this.map.getVecFromCellPos(2, 0).x-(gameCfg.cellSize/2);
    }
  }

  startActiveTimer()
  {
    let delayAction;
    let callback;
    delayAction = cc.delayTime(this.moveTime);
    callback = cc.callFunc(() =>
    {
      if(!this.isStoped)
      {
        this.isActive = true;

      }
    }, this);
    this.runAction(cc.sequence(delayAction, callback))
  }

  moveDirection(dirrection)
  {
    let moveAction;
    switch(dirrection)
    {
        case 'up':
            moveAction = new cc.MoveBy(this.moveTime, cc.p(0,gameCfg.cellSize));
            this.runAction(moveAction);
            this.startActiveTimer();
          break;
        case 'right':
          moveAction = new cc.MoveBy(this.moveTime, cc.p(gameCfg.cellSize,0));
          this.runAction(moveAction);
          this.startActiveTimer();
          break;
        case 'down':
          moveAction = new cc.MoveBy(this.moveTime, cc.p(0,-gameCfg.cellSize));
          this.runAction(moveAction);
          this.startActiveTimer();
          break;
        case 'left':
          moveAction = new cc.MoveBy(this.moveTime, cc.p(-gameCfg.cellSize,0));
          this.runAction(moveAction);
          this.startActiveTimer();
          break;
    }
  }

  moveDecide(posX, posY)
  {
    let top = this.map.levelArray[posY-1][posX];
    if(top != 1)
    {
      top = 0;
    }

    let right = this.map.levelArray[posY][posX+1];
    if(right != 1)
    {
      right = 0;
    }

    let bottom = this.map.levelArray[posY+1][posX];
    if(bottom != 1)
    {
      bottom = 0;
    }

    let left = this.map.levelArray[posY][posX-1];
    if(left != 1)
    {
      left = 0;
    }
    let randomNumber;
    let moveDir = 'left';
    let imageCode = top.toString() + right.toString() + bottom.toString() + left.toString();
    switch(imageCode)
    {
        case '0000':
            randomNumber = Math.floor(Math.random() * 4);
            if(randomNumber == 0)
            { moveDir = 'left';}
            else if (randomNumber == 1)
            { moveDir = 'up';}
            else if (randomNumber == 2)
            { moveDir = 'right';}
            else if (randomNumber == 3)
            { moveDir = 'down';}
            this.moveDirection(moveDir);
            this.lastMove = moveDir;
          break;

        case '1000':
          randomNumber = Math.floor(Math.random() * 3);
          if(randomNumber == 0)
          { moveDir = 'left';}
          else if (randomNumber == 1)
          { moveDir = 'down';}
          else if (randomNumber == 2)
          { moveDir = 'right';}
          this.moveDirection(moveDir);
          this.lastMove = moveDir;
          break;

        case '0100':
          randomNumber = Math.floor(Math.random() * 3);
          if(randomNumber == 0)
          { moveDir = 'left';}
          else if (randomNumber == 1)
          { moveDir = 'up';}
          else if (randomNumber == 2)
          { moveDir = 'down';}
          this.moveDirection(moveDir);
          this.lastMove = moveDir;
          break;

        case '0010':
            randomNumber = Math.floor(Math.random() * 3);
            if(randomNumber == 0)
            { moveDir = 'left';}
            else if (randomNumber == 1)
            { moveDir = 'up';}
            else if (randomNumber == 2)
            { moveDir = 'right';}
            this.moveDirection(moveDir);
            this.lastMove = moveDir;
          break;

        case '0001':
          randomNumber = Math.floor(Math.random() * 3);
          if(randomNumber == 0)
          { moveDir = 'up';}
          else if (randomNumber == 1)
          { moveDir = 'right';}
          else if (randomNumber == 2)
          { moveDir = 'down';}
          this.moveDirection(moveDir);
          this.lastMove = moveDir;
          break;

        case '1100':
          randomNumber = Math.floor(Math.random() * 2);
          if(randomNumber == 1)
          { moveDir = 'down';}
          this.moveDirection(moveDir);
          this.lastMove = moveDir;
          break;

        case '0110':
          randomNumber = Math.floor(Math.random() * 2);
          if(randomNumber == 1)
          { moveDir = 'up';}
          this.moveDirection(moveDir);
          this.lastMove = moveDir;
          break;

        case '0011':
          randomNumber = Math.floor(Math.random() * 2);
          if(randomNumber == 0)
          { moveDir = 'right';}
          else if(randomNumber == 1)
          { moveDir = 'up';}
          this.moveDirection(moveDir);
          this.lastMove = moveDir;
          break;

        case '1001':
          randomNumber = Math.floor(Math.random() * 2);
          if(randomNumber == 0)
          { moveDir = 'right';}
          else if(randomNumber == 1)
          { moveDir = 'down';}
          this.moveDirection(moveDir);
          this.lastMove = moveDir;
          break;

        case '1110':
          moveDir = 'left';
          this.moveDirection(moveDir);
          this.lastMove = moveDir;
          break;

        case '0111':
          moveDir = 'up';
          this.moveDirection(moveDir);
          this.lastMove = moveDir;
          break;

        case '1011':
          moveDir = 'right';
          this.moveDirection(moveDir);
          this.lastMove = moveDir;
          break;

        case '1101':
          moveDir = 'down';
          this.moveDirection(moveDir);
          this.lastMove = moveDir;
          break;
        case '1111':

          break;
        case '1010':
          this.moveDirection(this.lastMove);
          break;
        case '0101':
          this.moveDirection(this.lastMove);
          break;
    }
  }
}

module.exports.Enemy = Enemy;
