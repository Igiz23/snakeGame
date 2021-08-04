/* выбор объекта */
const snakeBoard = document.getElementById("gameCanvas");
/* формат игры */
const snakeCtx = snakeBoard.getContext("2d");

const area = new Image();
area.src = "img/area.png";

const food = new Image();
food.src = "img/food.png"

let box = 32;

let score = 0;

let flag = false;

let foodCord = {
    x: Math.floor((Math.random() * 17 + 1)) * box,
    y: Math.floor((Math.random() * 15 + 3)) * box
};

/*пустой массив для добавления длины змейки*/
let snake = [];
snake[0] = {
    x: 9 * box,
    y: 10 * box
};

/*отлавливаем ивенты с клавиатуры и отправляем в функцию */
document.addEventListener("keydown", direction);

let dir;

/*обработчик полученных ивентов*/
function direction(event)
{
    if (flag)
        return ;
    flag = true;
    if (event.keyCode === 37 && dir !== "right")
        dir = "left";
    else if (event.keyCode === 38 && dir !== "down")
        dir = "up";
    else if (event.keyCode === 39 && dir !== "left")
        dir = "right";
    else if (event.keyCode === 40 && dir !== "up")
        dir = "down";
    else
        console.log("Use only arrows!")
}

    function eatTail(head, arr)
    {
        for(let i = 0; i < arr.length; i++) {
            if(head.x === arr[i].x && head.y === arr[i].y)
                clearInterval(gameInterval);
        }
    }

function drawGame() {
    /*отрисовка поля*/
    snakeCtx.drawImage(area, 0, 0);
    /*рандомная отрисовка еды*/
    snakeCtx.drawImage(food, foodCord.x, foodCord.y);

    for(let i = 0; i < snake.length; i++)
    {
        snakeCtx.fillStyle = i === 0 ? "green" : "red";
        snakeCtx.fillRect(snake[i].x, snake[i].y, box, box);
    }

    snakeCtx.fillStyle = "white";
    snakeCtx.font = "50px Arial";
    /*печать score*/
    snakeCtx.fillText(score, box * 2.5, box * 1.7);

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if(snakeX === foodCord.x && snakeY === foodCord.y) {
        score++;
        foodCord = {
            x: Math.floor((Math.random() * 17 + 1)) * box,
            y: Math.floor((Math.random() * 15 + 3)) * box
        };
    } else {
        snake.pop();
    }

    /*условие для стен*/
    if (snakeX < box || snakeX > 17 * box || snakeY < 3 * box || snakeY > 17 * box)
        clearInterval(gameInterval);

    /*удаление последнего элемента в массиве*/
    if (dir === "left") snakeX -= box;
    if (dir === "right") snakeX += box;
    if (dir === "up") snakeY -= box;
    if (dir === "down") snakeY += box;

    let newHead = {
        x: snakeX,
        y: snakeY
    };

    eatTail(newHead, snake);
    flag = false;

    snake.unshift(newHead);
}

let gameInterval = setInterval(drawGame, 120);
