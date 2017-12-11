// created by imod
// imodeg@gmail.com

let gameCfg = require('GameConstants').gameCfg;
let Map = require('Map').Map;

cc.Class
({
  extends: cc.Component,

  properties:
  {
    scoreCounter: cc.Label
  },

  onLoad: function ()
  {
    this.startFull();
    this.score = 0;
  },

  restartFull: function ()
  {
    //this.scoreCounter.string = this.score;
    this.node.removeChild(this.map, true);
    this.startFull();
  },

  startFull: function ()
  {
    //this.scoreCounter.string = this.score;
    this.map = new Map(this.node, this);
  },

  update: function (dt)
  {
    this.map.update(dt);
  },
});
