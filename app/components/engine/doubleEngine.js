var DoubleGame = {

  preload: function () {
    this.game.load.image('snakeCellImage', '../images/panel_blue.png');
    this.game.load.image('foodImage', '../images/iconCircle_grey.png');
    this.game.load.image('obstacleImage', '../images/panel_beigeLight.png');
  },

  create: function () {
    snake1 = {
      alive: true,
      body: [],
      newDirection: null,
      addNew: false,
      currentDirection: 'RIGHT',
      score: 0,
      food: {},
      map: [],
      player: 1
    };
    snake2 = {
      alive: true,
      body: [],
      newDirection: null,
      addNew: false,
      currentDirection: 'RIGHT',
      score: 0,
      food: {},
      map: [],
      player: 2
    };

    tileSize = 10;
    speed = 7;
    updateDelay = 0;
    mapSize = 60;
    secondMapOffset = 61;

    initialSnakeSize = 10;
    numberOfInitialObstacles = 15;

    snake1.map = this.createInitialMap();
    snake2.map = this.createInitialMap();

    this.game.world.setBounds(0, 0, mapSize * tileSize, mapSize * tileSize);

    this.initializeSnake1();
    this.initializeSnake2();
    this.initializeMap();
    this.initializeObstacles();
    this.initializeFoods();
    this.initializeCode();
    this.displayScore();
  },

  initializeSnake1: function () {
    for (var i = 0; i < initialSnakeSize; i++) {
      snake1.body[i] = {
        sprite: this.game.add.sprite(tileSize * 10 + i * tileSize, tileSize * 10, 'snakeCellImage'),
        x: i + 10,
        y: 10
      };
    }
  },

  initializeSnake2: function () {
    for (var i = 0; i < initialSnakeSize; i++) {
      snake2.body[i] = {
        sprite: this.game.add.sprite(tileSize * 10 + i * tileSize + secondMapOffset * tileSize,
                                     tileSize * 10, 'snakeCellImage'),
        x: i + 10,
        y: 10
      };
    }
  },

  createInitialMap: function () {
    var initialMap = [];

    for (var i = 0; i < mapSize + 1; i++) {
      initialMap[i] = [];
      for (var j = 0; j < mapSize + 1; j++) {
        initialMap[i][j] = {
          x: i,
          y: j,
          type: 'T'
        };
      }
    }

    return initialMap;
  },

  initializeMap: function () {
    for (var y = 0; y < mapSize + 1; y++) {
      for (var x = 0; x < mapSize + 1; x++) {
        if (x == 0 || x == mapSize || y == 0 || y == mapSize) {
          snake1.map[x][y].sprite = this.game.add.sprite(x * tileSize, y * tileSize, 'obstacleImage');
          snake1.map[x][y].type = 'O';
          snake2.map[x][y].sprite = this.game.add.sprite(x * tileSize + secondMapOffset * tileSize, y * tileSize,
                                                         'obstacleImage');
          snake2.map[x][y].type = 'O';
        }
      }
    }
  },

  initializeFoods: function () {
    do {
      // HACK: Putting the inital food in the lower right corner
      // for the dummy code to work in every case
      var randomX = Math.floor(Math.random() * (mapSize - 30 + 1)) + 30;
      var randomY = Math.floor(Math.random() * (mapSize - 30 + 1)) + 30;
      var mapTile = snake1.map[randomX][randomY];
    } while (mapTile.type != 'T')

    snake1.food = {
      x: mapTile.x,
      y: mapTile.y,
      sprite: this.game.add.sprite(mapTile.x * tileSize, mapTile.y * tileSize, 'foodImage')
    };

    snake2.food = {
      x: mapTile.x,
      y: mapTile.y,
      sprite: this.game.add.sprite(mapTile.x * tileSize + secondMapOffset * tileSize, mapTile.y * tileSize, 'foodImage')
    };
  },

  initializeObstacles: function () {
    for (var i = 0; i < numberOfInitialObstacles; i++) {
      do {
        var randomX = Math.floor(Math.random() * (mapSize - 1)) + 1;
        var randomY = Math.floor(Math.random() * (mapSize - 1)) + 1;

        var mapTile1 = snake1.map[randomX][randomY];
        var mapTile2 = snake2.map[randomX][randomY];
      } while (mapTile1.type != 'T' && mapTile1.x != 19 && mapTile1.y != 10)
      // HACK: Avoid putting an obstacle on the newborn snakey's head

      mapTile1.type = 'O';
      snake1.map[randomX][randomY].sprite =
        this.game.add.sprite(randomX * tileSize, randomY * tileSize, 'obstacleImage');

      mapTile2.type = 'O';
      snake2.map[randomX][randomY].sprite =
        this.game.add.sprite(randomX * tileSize + secondMapOffset * tileSize, randomY * tileSize, 'obstacleImage');
    }
  },

  displayScore: function () {
    this.add.text(30, 20, 'SCORE:', {
      font: 'bold 16px sans-serif',
      fill: '#46c0f9',
      align: 'center'
    });

    scoreText1 = this.add.text(100, 20, snake1.score.toString(), {
      font: 'bold 16px sans-serif',
      fill: '#fff',
      align: 'center'
    });

    this.add.text(630, 20, 'SCORE:', {
      font: 'bold 16px sans-serif',
      fill: '#46c0f9',
      align: 'center'
    });

    scoreText2 = this.add.text(700, 20, snake2.score.toString(), {
      font: 'bold 16px sans-serif',
      fill: '#fff',
      align: 'center'
    });
  },

  generateFood: function (snake) {
    do {
      var randomX = Math.floor(Math.random() * (mapSize - 1)) + 1;
      var randomY = Math.floor(Math.random() * (mapSize - 1)) + 1;
      var mapTile = snake.map[randomX][randomY];
    } while (mapTile.type != 'T')

    if (snake.player == 1) {
      var newFoodSprite = this.game.add.sprite(mapTile.x * tileSize, mapTile.y * tileSize, 'foodImage');
    } else {
      var newFoodSprite = this.game.add.sprite(mapTile.x * tileSize + secondMapOffset * tileSize, mapTile.y * tileSize, 'foodImage');
    }

    snake.food = {
      x: mapTile.x,
      y: mapTile.y,
      sprite: newFoodSprite
    };
  },

  initializeCode: function () {
    this.code1 = this.code1.replace('this.moveSnake', 'this.moveSnake1');
    eval(this.code1);
    this.code2 = this.code2.replace('this.moveSnake', 'this.moveSnake2');
    eval(this.code2);
  },

  checkSelfCollision: function (snake) {
    var head = snake.body[snake.body.length - 1];
    for (var i = 0; i < snake.body.length - 1; i++) {
      if (head.x == snake.body[i].x && head.y == snake.body[i].y) {
        snake.alive = false;
      }
    }
  },

  checkObstacleCollision: function (snake) {
    var head = snake.body[snake.body.length - 1];
    var mapTile = snake.map[head.x][head.y];
    if (mapTile.type == 'O') {
      snake.alive = false;
    }
  },

  checkFoodCollision: function (snake) {
    for (var i = 0; i < snake.body.length; i++) {
      if (snake.body[i].x == snake.food.x && snake.body[i].y == snake.food.y) {
        snake.addNew = true;
        snake.food.sprite.destroy();
        this.generateFood(snake);
        snake.score++;
        if (snake.player == 1) {
          scoreText1.setText(snake1.score.toString(), true);
        } else {
          scoreText2.setText(snake2.score.toString(), true);
        }
      }
    }
  },

  update: function () {
    updateDelay++;

    if (updateDelay % (10 - speed) == 0) {
      if (snake1.alive) {
        var newDirection = this.moveSnake1(snake1.body, snake1.food, snake1.map);
        this.repositionSnake(snake1, newDirection);

        this.checkFoodCollision(snake1);
        this.checkSelfCollision(snake1);
        this.checkObstacleCollision(snake1);
      }

      if (snake2.alive) {
        newDirection = this.moveSnake2(snake2.body, snake2.food, snake2.map);
        this.repositionSnake(snake2, newDirection);

        this.checkFoodCollision(snake2);
        this.checkSelfCollision(snake2);
        this.checkObstacleCollision(snake2);
      }
    }
  },

  repositionSnake: function (snake, newDirection) {
    var firstCell = snake.body[snake.body.length - 1];
    var lastCell = snake.body.shift();
    var oldLastCellSpriteX = lastCell.sprite.x;
    var oldLastCellSpriteY = lastCell.sprite.y;
    var oldLastCellX = lastCell.x;
    var oldLastCellY = lastCell.y;

    if (snake.currentDirection == newDirection) {
      newDirection = null;
    }

    if (newDirection) {
      snake.currentDirection = newDirection;
      newDirection = null;
    }

    if (snake.currentDirection == 'RIGHT') {
      lastCell.sprite.x = firstCell.sprite.x + tileSize;
      lastCell.sprite.y = firstCell.sprite.y;

      lastCell.x = firstCell.x + 1;
      lastCell.y = firstCell.y;
    }
    else if (snake.currentDirection == 'LEFT') {
      lastCell.sprite.x = firstCell.sprite.x - tileSize;
      lastCell.sprite.y = firstCell.sprite.y;

      lastCell.x = firstCell.x - 1;
      lastCell.y = firstCell.y;
    }
    else if (snake.currentDirection == 'UP') {
      lastCell.sprite.x = firstCell.sprite.x;
      lastCell.sprite.y = firstCell.sprite.y - tileSize;

      lastCell.x = firstCell.x;
      lastCell.y = firstCell.y - 1;
    }
    else if (snake.currentDirection == 'DOWN') {
      lastCell.sprite.x = firstCell.sprite.x;
      lastCell.sprite.y = firstCell.sprite.y + tileSize;

      lastCell.x = firstCell.x;
      lastCell.y = firstCell.y + 1;
    }

    snake.body.push(lastCell);
    firstCell = lastCell;

    if (snake.addNew) {
      snake.body.unshift({
        x: oldLastCellX,
        y: oldLastCellY,
        sprite: this.game.add.sprite(oldLastCellSpriteX, oldLastCellSpriteY, 'snakeCellImage')
      });
      snake.addNew = false;
    }

    return firstCell;
  }
};
