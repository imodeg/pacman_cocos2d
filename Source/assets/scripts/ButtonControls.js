let controls = require('Controls').controls;

cc.Class
({
    extends: cc.Component,

    properties:
    {
      buttonLeft: cc.Button,
      buttonRight: cc.Button,
      buttonUp: cc.Button,
      buttonDown: cc.Button
    },

    onLoad ()
    {
      if(cc.sys.platform == 101)
      {
        this.buttonLeft.enabled = false;
        this.buttonRight.enabled = false;
        this.buttonUp.enabled = false;
        this.buttonDown.enabled = false;

        this.buttonLeft.node.opacity = 0;
        this.buttonRight.node.opacity = 0;
        this.buttonUp.node.opacity = 0;
        this.buttonDown.node.opacity = 0;
      }
    },

    start ()
    {

    },

    upButtonUp: function()
    {
      controls.isUpPressed = false;
    },

    upButtonDown: function()
    {
      controls.isDownPressed = false;
    },

    upButtonLeft: function()
    {
      controls.isLeftPressed = false;
    },

    upButtonRight: function()
    {
      controls.isRightPressed = false;
    },

    update: function (dt)
    {
      if(this.buttonUp._pressed && controls.isUpPressed == false && controls.isActive)
      {
        controls.isUpPressed = true;
        controls.isDownPressed = false;
        controls.isLeftPressed = false;
        controls.isRightPressed = false;
      }

      if(this.buttonDown._pressed && controls.isDownPressed == false && controls.isActive)
      {
        controls.isUpPressed = false;
        controls.isDownPressed = true;
        controls.isLeftPressed = false;
        controls.isRightPressed = false;
      }

      if(this.buttonLeft._pressed && controls.isLeftPressed == false && controls.isActive)
      {
        controls.isUpPressed = false;
        controls.isLeftPressed = true;
        controls.isDownPressed = false;
        controls.isRightPressed = false;
      }

      if(this.buttonRight._pressed && controls.isRightPressed == false && controls.isActive)
      {
        controls.isUpPressed = false;
        controls.isRightPressed = true;
        controls.isLeftPressed = false;
        controls.isDownPressed = false;
      }
    }
    // update (dt) {},
});
