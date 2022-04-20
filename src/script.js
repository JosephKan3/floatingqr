(function () {
    var canvas = document.createElement("canvas");
    var context = canvas.getContext("2d");
  
    document.body.appendChild(canvas);
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  
    var backgrounds = ["red", "greenyellow", "#da27fb", "#dd7319"];
    var colorIndex = 0;
  
    var block;
    var padding = 1;
  
    var image = new Image();
    image.onload = function () {
      block = {
        x: window.innerWidth / 2 - 75,
        y: window.innerHeight / 2 - 75,
        width: 150,
        height: 150,
        xDir: -1.5,
        yDir: 1.5,
      };
  
      init();
    };
  
    image.src = "./newQR-removebg-preview.png";
  
    function init() {
      draw();
      update();
    }
  
    function draw() {
      context.fillStyle = backgrounds[colorIndex];
      context.fillRect(block.x, block.y, block.width, block.height);
      context.drawImage(
        image,
        block.x + padding,
        block.y + padding,
        block.width - padding * 2,
        block.height - padding * 2
      );
    }
  
    function update() {
      canvas.width = canvas.width;
  
      block.x = block.x + block.xDir;
      block.y = block.y + block.yDir;
  
      var changed = false;
  
      if (block.x <= 0) {
        block.xDir = block.xDir * -1;
        changed = true;
      }
  
      if (block.y + block.height >= canvas.height) {
        block.yDir = block.yDir * -1;
        changed = true;
      }
  
      if (block.y <= 0) {
        block.yDir *= -1;
        block.y = 0;
        changed = true;
      }
  
      if (block.x + block.width >= canvas.width) {
        block.xDir *= -1;
        changed = true;
      }
  
      if (changed === true) {
        colorIndex++;
        if (colorIndex > backgrounds.length - 1) {
          colorIndex = 0;
        }
      }
  
      draw();
      window.requestAnimationFrame(update);
    }
  })();
  