var Game = {

  preload: function() {
    this.game.load.image('snakeCellImage', '../images/panel_blue.png');
    this.game.load.image('foodImage', '../images/iconCircle_grey.png');
  },

  create: function() {
    snake = [];
    food = {};
    squareSize = 15;
    score = 0;
    speed = 8;
    updateDelay = 0;
    direction = 'RIGHT';
    newDirection = null;
    addNew = false;
    initialSize = 10;

    this.game.world.setBounds(0, 0, 1000, 650);

    for (var i = 0; i < initialSize; i++) {
      snake[i] = this.game.add.sprite(150 + i * squareSize, 150, 'snakeCellImage');
    }

    this.generateFood();
    this.initializeCode();

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
    // TODO: Align food image properly
    var randomX = Math.floor(Math.random() * 40) * squareSize;
    var randomY = Math.floor(Math.random() * 40) * squareSize;

    food = this.game.add.sprite(randomX, randomY, 'foodImage');
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
    if (head.x >= 1000 || head.x < 0 || head.y >= 650 || head.y < 0) {
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
      var firstCell = snake[snake.length - 1];
      var lastCell = snake.shift();
      var oldLastCellx = lastCell.x;
      var oldLastCelly = lastCell.y;

      newDirection = this.moveSnake(firstCell.x, firstCell.y, food.x, food.y);

      if (direction == newDirection) {
        newDirection = null;
      }

      if (newDirection) {
        direction = newDirection;
        newDirection = null;
      }

      if (direction == 'RIGHT') {
        lastCell.x = firstCell.x + 15;
        lastCell.y = firstCell.y;
      }
      else if (direction == 'LEFT') {
        lastCell.x = firstCell.x - 15;
        lastCell.y = firstCell.y;
      }
      else if (direction == 'UP') {
        lastCell.x = firstCell.x;
        lastCell.y = firstCell.y - 15;
      }
      else if (direction == 'DOWN') {
        lastCell.x = firstCell.x;
        lastCell.y = firstCell.y + 15;
      }

      snake.push(lastCell);
      firstCell = lastCell;

      if (addNew) {
        snake.unshift(this.game.add.sprite(oldLastCellx, oldLastCelly, 'snakeCellImage'));
        addNew = false;
      }

      this.checkFoodCollision();
      this.checkSelfCollision(firstCell);
      this.checkWallCollision(firstCell);
    }
  }
};

var GameOver = {
  create: function() {
    this.game.add.text(420, 230, 'FINAL SCORE:', {
      font: 'bold 16px sans-serif',
      fill: '#46c0f9',
      align: 'center'
    });

    this.game.add.text(540, 230, score.toString(), {
      font: 'bold 16px sans-serif',
      fill: '#fff',
      align: 'center'
    });
  }
};
