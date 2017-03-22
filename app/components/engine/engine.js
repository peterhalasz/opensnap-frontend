var Game = {

    code : "",

    preload : function() {
        this.game.load.image('snakeBody','../images/panel_blue.png');
    },

    create : function() {

        snake = [];
        squareSize = 15;
        score = 0;
        speed = 3;
        updateDelay = 0;
        direction = 'RIGHT';
        new_direction = null;
        addNew = false;

        this.game.world.setBounds(0, 0, 800, 600);

        for(var i = 0; i < 10; i++){
            snake[i] = this.game.add.sprite(150+i*squareSize, 150, 'snakeBody');
        }

        this.initializeCode();
    },

    initializeCode : function () {
        eval(this.code);
    },

    checkSelfCollision: function(head) {
        for(var i = 0; i < snake.length - 1; i++){
            if(head.x == snake[i].x && head.y == snake[i].y){
                game.state.start('Game_Over');
            }
        }
    },

    checkWallCollision: function(head) {
        if(head.x >= 600 || head.x < 0 || head.y >= 600 || head.y < 0){
            game.state.start('Game_Over');
        }
    },

    update : function() {
        updateDelay++;

        if (updateDelay % (10 - speed) == 0) {

            new_direction = this.moveSnake();

            if (direction == new_direction) {
                new_direction = null;
            }

            var firstCell = snake[snake.length - 1],
                lastCell = snake.shift(),
                oldLastCellx = lastCell.x,
                oldLastCelly = lastCell.y;

            if(new_direction){
                direction = new_direction;
                new_direction = null;
            }

            if(direction == 'RIGHT'){
                lastCell.x = firstCell.x + 15;
                lastCell.y = firstCell.y;
            }
            else if(direction == 'LEFT'){
                lastCell.x = firstCell.x - 15;
                lastCell.y = firstCell.y;
            }
            else if(direction == 'UP'){
                lastCell.x = firstCell.x;
                lastCell.y = firstCell.y - 15;
            }
            else if(direction == 'DOWN'){
                lastCell.x = firstCell.x;
                lastCell.y = firstCell.y + 15;
            }

            snake.push(lastCell);
            firstCell = lastCell;

            if(addNew){
                snake.unshift(this.game.add.sprite(oldLastCellx, oldLastCelly, 'snake'));
                addNew = false;
            }

            this.checkSelfCollision(firstCell);

            this.checkWallCollision(firstCell);
        }
    },
}

var Game_Over = {};
