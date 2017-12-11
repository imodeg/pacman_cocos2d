let gameCfg = require('GameConstants').gameCfg;
let controls = require('Controls').controls;
let SpriteAnimated = require('SpriteAnimated').SpriteAnimated;

class Player extends cc.Node
{
  constructor(parentMap, x = 0, y = 0)
  {
    super("player")
    //this.sprite = this.addComponent(cc.Sprite);
    this.sprite = this.addComponent(SpriteAnimated);
    this.map = parentMap;
    this.parent = parentMap;
    this.startX = x;
    this.startY = y;
    this.x = x;
    this.y = y;
    this.speed = 1.8;
    this.velocity = cc.p(0, 0);
    this.group = 'pacman';
    this.isAlive = true;
    this.isSuper = false

    this.sprite.addAnimation('idle', 1, ['resources/pacman_01.png']);
    this.sprite.addAnimation('run', 1, ['resources/pacman_01.png', 'resources/pacman_02.png']);
    this.sprite.addAnimation('death', 1, ['resources/pacman_dead1.png', 'resources/pacman_dead2.png', 'resources/pacman_dead3.png', 'resources/pacman_dead4.png', 'resources/pacman_dead4.png', 'resources/pacman_dead4.png', 'resources/pacman_dead4.png', 'resources/pacman_dead4.png', 'resources/pacman_dead4.png', 'resources/pacman_dead4.png', 'resources/pacman_dead4.png']);
    this.sprite.setAnimation('run');
    this.sprite.start();

    this.anchorX = 0.5;
    this.anchorY = 0.5;

  }

  start()
  {
    this.isAlive = true;
    controls.controlsEnable();
  }

  stop()
  {
    this.velocity.x = 0;
    this.velocity.y = 0;
    controls.controlsDisable();
  }

  death()
  {
    this.isAlive = false;
    this.velocity.x = 0;
    this.velocity.y = 0;
    this.rotation = 0;
    this.sprite.setAnimation('death');

    controls.controlsDisable();

    let url = cc.url.raw("resources/Pacman-death-sound.mp3");
    cc.audioEngine.playEffect(url);

    this.map.stop();
  }

  restart()
  {
    this.sprite.setAnimation('run');
    this.x = this.startX;
    this.y = this.startY;
  }

  update(dt)
  {
    if(this.isAlive)
    {
    //this.map.getCellPosFromCoordinates(this.x, this.y);
    this.playerPos = this.map.getCellPosFromCoordinates(this.x, this.y);

    let playerBox = this.getBoundingBox();
    for(let i = 0; i < this.map.enemyArray.length; i++)
    {
      if(playerBox.intersects(this.map.enemyArray[i].getBoundingBox()) && this.map.enemyArray[i].isEatible)
      {
        if(!this.isSuper)
        {
          this.death();
        }
        else if(this.map.enemyArray[i].isEatible)
        {
          let url = cc.url.raw("resources/Pacman-bigdot.mp3");
          cc.audioEngine.playEffect(url);

          this.map.enemyArray[i].death();
          this.map.addScore(150);
        }
      }
    }

    let currentEntity = this.map.entitiesArray[this.playerPos.posX][this.playerPos.posY];
    if(currentEntity != null)
    {
      if(currentEntity.group == 'dot')
      {
        let url = cc.url.raw("resources/Pacman-waka.mp3");
        cc.audioEngine.playEffect(url);
        this.map.removeChild(currentEntity, true);
        this.map.entitiesArray[this.playerPos.posX][this.playerPos.posY] = null;
        this.map.dotsCount--;
        this.map.addScore(50);
        this.map.checkForWin();
      }
      else if(currentEntity.group == 'bigdot')
      {
        let url = cc.url.raw("resources/Pacman-waka.mp3");
        cc.audioEngine.playEffect(url);

        this.map.removeChild(currentEntity, true);
        this.map.entitiesArray[this.playerPos.posX][this.playerPos.posY] = null;
        this.map.addScore(100);
        this.map.dotsCount--;
        if(this.map.dotsCount > 0)
        {
          let url = cc.url.raw("resources/Pacman-win.mp3");
          cc.audioEngine.playEffect(url);

          this.isSuper = true;
          this.map.startSuper();
        }
        this.map.checkForWin();

      }
    }

    //let block = this.checkCollision(this.map.blocksArray);
    let block = this.checkCollisionAround('wall', null);
    if(block)
    {
      this.sprite.pause();
      if(this.velocity.x != 0)
      {
        this.velocity.x = 0;
        if(block.x > this.x)
        {
          this.x = block.x - gameCfg.cellSize;
        }
        else
        {
          this.x = block.x + gameCfg.cellSize;
        }
      }
      else if(this.velocity.y != 0)
      {
        this.velocity.y = 0;
        if(block.y > this.y)
        {
          this.y = block.y - gameCfg.cellSize;
        }
        else
        {
          this.y = block.y + gameCfg.cellSize;
        }
      }
    }
    else
    {
      this.x += this.velocity.x;
      this.y += this.velocity.y;
    }

    if(controls.isLeftPressed && !block)
    {
      if(!this.checkCollisionAround('wall', 'left'))
      {
        this.sprite.play();
        this.velocity.x = -this.speed;
        this.velocity.y = 0;
        this.rotation = 180;
      }
    }
    else if(controls.isRightPressed && !block)
    {
      if(!this.checkCollisionAround('wall', 'right'))
      {
        this.sprite.play();
        this.velocity.x = this.speed;
        this.velocity.y = 0;
        this.rotation = 0;
      }
    }
    else if(controls.isUpPressed && !block)
    {
      if(!this.checkCollisionAround('wall', 'up'))
      {
        this.sprite.play();
        this.velocity.x = 0;
        this.velocity.y = this.speed;
        this.rotation = -90;
      }
    }
    else if(controls.isDownPressed && !block)
    {
      if(!this.checkCollisionAround('wall', 'down'))
      {
        this.sprite.play();
        this.velocity.x = 0;
        this.velocity.y = -this.speed;
        this.rotation = 90;
      }
    }

    if(this.playerPos.posX <= 1)
    {
      this.x = this.map.getVecFromCellPos(this.map.levelArray[0].length-3, 0).x;
    }

    if(this.playerPos.posX >= this.map.levelArray[0].length-2)
    {
      this.x = this.map.getVecFromCellPos(2, 0).x;
    }

    } //is alive
  }

  checkCollisionWithEntity(entity, collisionGroupName, hitBox)
  {
    let playerBox = hitBox;
    if(entity != null)
    {
      if(entity.group == collisionGroupName)
      {
        if(playerBox.intersects(entity.getBoundingBox()))
        {
          return true;
        }
      }
    }
    return false;
  }

  checkCollisionAround(collisionGroupName, dirrection = null) //optimization for collision
  {
    let playerBox = this.getBoundingBox();
    let posX;
    let posY;
    let currentEntity;

    switch(dirrection)
    {
        case 'left':
            playerBox.x -= gameCfg.cellSize;
          break;
        case 'right':
            playerBox.x += gameCfg.cellSize;
          break;
        case 'up':
            playerBox.y += gameCfg.cellSize;
          break;
        case 'down':
            playerBox.y -= gameCfg.cellSize;
          break;
    }

    if(dirrection == null)
    {
      posX = this.playerPos.posX;
      posY = this.playerPos.posY;
      currentEntity = this.map.entitiesArray[posX][posY]; //current
      if(this.checkCollisionWithEntity(currentEntity, collisionGroupName, playerBox))
      {
        return currentEntity;
      }
    }

    if(dirrection == null || dirrection == 'up' || dirrection == 'left')
    {
      posX = this.playerPos.posX -1; //TODO check if <= 0 or >= max map size
      posY = this.playerPos.posY -1;
      currentEntity = this.map.entitiesArray[posX][posY]; //topLeft
      if(this.checkCollisionWithEntity(currentEntity, collisionGroupName, playerBox))
      {
        return currentEntity;
      }
    }

    if(dirrection == null || dirrection == 'up')
    {
      posX = this.playerPos.posX;
      posY = this.playerPos.posY -1;
      currentEntity = this.map.entitiesArray[posX][posY]; //top
      if(this.checkCollisionWithEntity(currentEntity, collisionGroupName, playerBox))
      {
        return currentEntity;
      }
    }

    if(dirrection == null || dirrection == 'up' || dirrection == 'right')
    {
      posX = this.playerPos.posX +1;
      posY = this.playerPos.posY -1;
      currentEntity = this.map.entitiesArray[posX][posY]; //topRight
      if(this.checkCollisionWithEntity(currentEntity, collisionGroupName, playerBox))
      {
        return currentEntity;
      }
    }

    if(dirrection == null || dirrection == 'left')
    {
      posX = this.playerPos.posX -1;
      posY = this.playerPos.posY;
      currentEntity = this.map.entitiesArray[posX][posY]; //left
      if(this.checkCollisionWithEntity(currentEntity, collisionGroupName, playerBox))
      {
        return currentEntity;
      }
    }

    if(dirrection == null || dirrection == 'right')
    {
      posX = this.playerPos.posX +1;
      posY = this.playerPos.posY;
      currentEntity = this.map.entitiesArray[posX][posY]; //right
      if(this.checkCollisionWithEntity(currentEntity, collisionGroupName, playerBox))
      {
        return currentEntity;
      }
    }

    if(dirrection == null || dirrection == 'down' || dirrection == 'left')
    {
      posX = this.playerPos.posX -1;
      posY = this.playerPos.posY +1;
      currentEntity = this.map.entitiesArray[posX][posY]; //bottomLeft
      if(this.checkCollisionWithEntity(currentEntity, collisionGroupName, playerBox))
      {
        return currentEntity;
      }
    }

    if(dirrection == null || dirrection == 'down')
    {
      posX = this.playerPos.posX;
      posY = this.playerPos.posY +1;
      currentEntity = this.map.entitiesArray[posX][posY]; //bottom
      if(this.checkCollisionWithEntity(currentEntity, collisionGroupName, playerBox))
      {
        return currentEntity;
      }
    }

    if(dirrection == null || dirrection == 'down' || dirrection == 'right')
    {
      posX = this.playerPos.posX +1;
      posY = this.playerPos.posY +1;
      currentEntity = this.map.entitiesArray[posX][posY]; //bottomRight
      if(this.checkCollisionWithEntity(currentEntity, collisionGroupName, playerBox))
      {
        return currentEntity;
      }
    }

    return false;
  }
}

module.exports.Player = Player;
