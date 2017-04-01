var Game = {

  preload: function() {
    this.game.load.image('snakeCellImage', '../images/panel_blue.png');
    this.game.load.image('foodImage', '../images/iconCircle_grey.png');
    this.game.load.image('obstacleImage', '../images/panel_beigeLight.png');
  },

  create: function() {
    snake = [];
    food = {};
    tileSize = 10;
    score = 0;
    speed = 8;
    updateDelay = 0;
    currentDirection = 'RIGHT';
    newDirection = null;
    addNew = false;
    initialSnakeSize = 10;

    mapWidth = 60;
    mapHeight = 60;

    this.game.world.setBounds(0, 0, mapWidth*tileSize, mapHeight*tileSize);

    this.initializeSnake();
    this.initializeBorders();
    this.generateFood();
    this.initializeCode();
    this.displayScore();
  },

  initializeSnake: function() {
    for (var i = 0; i < initialSnakeSize; i++) {
      snake[i] = this.game.add.sprite(tileSize*10 + i * tileSize, tileSize*10, 'snakeCellImage');
    }
  },

  initializeBorders: function() {
    for (var y = 0; y < mapHeight+1; y++) {
      for (var x = 0; x < mapWidth+1; x++) {
        if (x == 0 || x == mapWidth || y == 0 || y == mapHeight)
          this.game.add.sprite(x*tileSize, y*tileSize, 'obstacleImage');
      }
    }
  },

  displayScore: function() {
    this.add.text(30, 20, 'SCORE:', {
      font: 'bold 16px sans-serif',
      fill: '#46c0f9',
      align: 'center'
    });

    scoreText = this.add.text(100, 20, score.toString(), {
      font: 'bold 16px sans-serif',
      fill: '#fff',
      align: 'center'
    });
  },

  generateFood: function() {
    var randomX = Math.floor(Math.random() * (mapWidth - 1)) + 1;
    var randomY = Math.floor(Math.random() * (mapHeight - 1)) + 1;

    food = this.game.add.sprite(randomX*tileSize, randomY*tileSize, 'foodImage');
  },

  initializeCode: function() {
    eval(this.code);
  },

  checkSelfCollision: function(head) {
    for (var i = 0; i < snake.length - 1; i++) {
      if (head.x == snake[i].x && head.y == snake[i].y) {
        this.state.start('GameOver');
      }
    }
  },

  checkWallCollision: function(head) {
    if (head.x >= mapWidth*tileSize-tileSize || head.x == 0 ||
        head.y >= mapHeight*tileSize-tileSize || head.y == 0) {
      this.state.start('GameOver');
    }
  },

  checkFoodCollision: function() {
    for (var i = 0; i < snake.length; i++) {
      if (snake[i].x == food.x && snake[i].y == food.y) {
        addNew = true;
        food.destroy();
        this.generateFood();
        score++;
        scoreText.setText(score.toString(), true);
      }
    }
  },

  update: function() {
    updateDelay++;

    if (updateDelay % (10 - speed) == 0) {
      var snakeHead = this.repositionSnake();

      this.checkFoodCollision();
      this.checkSelfCollision(snakeHead);
      this.checkWallCollision(snakeHead);
    }
  },

  repositionSnake: function() {
      var firstCell = snake[snake.length - 1];
      var lastCell = snake.shift();
      var oldLastCellY = lastCell.x;
      var oldLastCelly = lastCell.y;

      newDirection = this.moveSnake(firstCell.x, firstCell.y, food.x, food.y);

      if (currentDirection == newDirection) {
        newDirection = null;
      }

      if (newDirection) {
        currentDirection = newDirection;
        newDirection = null;
      }

      if (currentDirection == 'RIGHT') {
        lastCell.x = firstCell.x + tileSize;
        lastCell.y = firstCell.y;
      }
      else if (currentDirection == 'LEFT') {
        lastCell.x = firstCell.x - tileSize;
        lastCell.y = firstCell.y;
      }
      else if (currentDirection == 'UP') {
        lastCell.x = firstCell.x;
        lastCell.y = firstCell.y - tileSize;
      }
      else if (currentDirection == 'DOWN') {
        lastCell.x = firstCell.x;
        lastCell.y = firstCell.y + tileSize;
      }

      snake.push(lastCell);
      firstCell = lastCell;

      if (addNew) {
        snake.unshift(this.game.add.sprite(oldLastCellY, oldLastCelly, 'snakeCellImage'));
        addNew = false;
      }

      return firstCell;
  }
};

var GameOver = {
  create: function() {
    this.game.add.text(240, 280, 'FINAL SCORE:', {
      font: 'bold 16px sans-serif',
      fill: '#46c0f9',
      align: 'center'
    });

    this.game.add.text(360, 280, score.toString(), {
      font: 'bold 16px sans-serif',
      fill: '#fff',
      align: 'center'
    });
  }
};
