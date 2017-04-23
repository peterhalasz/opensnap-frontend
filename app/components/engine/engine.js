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
    speed = 7;
    updateDelay = 0;
    currentDirection = 'RIGHT';
    newDirection = null;
    addNew = false;
    initialSnakeSize = 10;

    mapWidth = 61;
    mapHeight = 61;

    this.game.world.setBounds(0, 0, mapWidth*tileSize, mapHeight*tileSize);

    this.initializeSnake();
    this.initializeMap();
    this.generateFood();
    this.initializeCode();
    this.displayScore();
  },

  initializeSnake: function() {
    for (var i = 0; i < initialSnakeSize; i++) {
      snake[i] = {
        sprite: this.game.add.sprite(tileSize*10 + i * tileSize, tileSize*10, 'snakeCellImage'),
        x: i + 10,
        y: 10
      };
    }
  },

  initializeMap: function() {
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

    food = {
      x: randomX,
      y: randomY,
      sprite: this.game.add.sprite(randomX*tileSize, randomY*tileSize, 'foodImage')
    };
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
    if (head.x >= mapWidth || head.x == 0 ||
        head.y >= mapHeight || head.y == 0) {
      this.state.start('GameOver');
    }
  },

  checkFoodCollision: function() {
    for (var i = 0; i < snake.length; i++) {
      if (snake[i].x == food.x && snake[i].y == food.y) {
        addNew = true;
        food.sprite.destroy();
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
      // TODO: Cleanup!
      var firstCell = snake[snake.length - 1];
      var lastCell = snake.shift();
      var oldLastCellSpriteX = lastCell.sprite.x;
      var oldLastCellSpriteY = lastCell.sprite.y;
      var oldLastCellX = lastCell.x;
      var oldLastCellY = lastCell.y;

      newDirection = this.moveSnake(snake, {x: food.x, y: food.y});

      if (currentDirection == newDirection) {
        newDirection = null;
      }

      if (newDirection) {
        currentDirection = newDirection;
        newDirection = null;
      }

      if (currentDirection == 'RIGHT') {
        lastCell.sprite.x = firstCell.sprite.x + tileSize;
        lastCell.sprite.y = firstCell.sprite.y;

        lastCell.x = firstCell.x + 1;
        lastCell.y = firstCell.y;
      }
      else if (currentDirection == 'LEFT') {
        lastCell.sprite.x = firstCell.sprite.x - tileSize;
        lastCell.sprite.y = firstCell.sprite.y;

        lastCell.x = firstCell.x - 1;
        lastCell.y = firstCell.y;
      }
      else if (currentDirection == 'UP') {
        lastCell.sprite.x = firstCell.sprite.x;
        lastCell.sprite.y = firstCell.sprite.y - tileSize;

        lastCell.x = firstCell.x;
        lastCell.y = firstCell.y - 1;
      }
      else if (currentDirection == 'DOWN') {
        lastCell.sprite.x = firstCell.sprite.x;
        lastCell.sprite.y = firstCell.sprite.y + tileSize;

        lastCell.x = firstCell.x;
        lastCell.y = firstCell.y + 1;
      }

      snake.push(lastCell);
      firstCell = lastCell;

      if (addNew) {
        snake.unshift({
          x: oldLastCellX,
          y: oldLastCellY,
          sprite: this.game.add.sprite(oldLastCellSpriteX, oldLastCellSpriteY, 'snakeCellImage')
        });
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
