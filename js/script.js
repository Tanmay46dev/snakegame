// Direction of snake
let inputDir = { x: 0, y: 0 };

// Sound Effects: Not yet
const music = new Audio('assets/sounds/music.mp3');
// Game loop variables
let speed = 5;
let lastPaintTime = 0;
let score = 0;

// Snake variables
let snakeArr = [
    { x: 13, y: 15 }
];

let food = { x: 6, y: 7 };

function main(ctime)
{
    window.requestAnimationFrame(main);
    if ((ctime - lastPaintTime) / 1000 < 1 / speed)
    {
        return;
    }
    lastPaintTime = ctime;
    music.play();
    gameEngine();
}

function updateScore(newScore)
{
    scoreText.innerHTML = "Score: " + newScore;
}

function isCollided(snake)
{
    // If you bump into the wall
    if (snake[0].x >= 18 || snake[0].x <= 0 || snake[0].y >= 18 || snake[0].y <= 0)
    {
        return true;
    }

    // If your bump into yourself
    for (let i = 1; i < snakeArr.length; i++)
    {
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y)
        {
            return true;
        }
    }


    return false;
}

function gameEngine()
{
    //Part 1: Updating the snake array and food
    if (isCollided(snakeArr))
    {
        inputDir = { x: 0, y: 0 };
        music.pause();
        alert("Game Over! Press Any Key To Play Again");
        snakeArr = [{ x: 13, y: 15 }];
        score = 0;
        updateScore(score);
        music.play();
    }

    // If the snake eats the food: increment score and change position of food
    if (snakeArr[0].y === food.y && snakeArr[0].x === food.x)
    {
        snakeArr.unshift({ x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y });
        let a = 1;
        let b = 17;
        score++;
        updateScore(score);
        console.log(score);
        food = { x: Math.round(a + (b - a) * Math.random()), y: Math.round(a + (b - a) * Math.random()) };
    }

    // Moving the snake
    for (let i = snakeArr.length - 2; i >= 0; i--)
    {
        const element = snakeArr[i];
        snakeArr[i + 1] = { ...snakeArr[i] };
    }

    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;

    //Part 2: Displaying the snake and food
    board.innerHTML = "";
    snakeArr.forEach((e, index) =>
    {
        let snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        board.appendChild(snakeElement);
        if (index === 0)
        {
            snakeElement.classList.add('head');
        }
        else
        {
            snakeElement.classList.add('snake');
        }
    });
    // Displaying the food
    let foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');
    board.appendChild(foodElement);

}



// Main logic starts here
music.play();
updateScore(score);
window.requestAnimationFrame(main);
window.addEventListener('keydown', e =>
{
    inputDir = { x: 0, y: 1 }; // Start the game
    switch (e.key)
    {
        case "ArrowUp":
            console.log("Arrow up clicked");
            inputDir.x = 0;
            inputDir.y = -1;
            break;
        case "ArrowDown":
            console.log("Arrow down clicked");
            inputDir.x = 0;
            inputDir.y = 1;
            break;
        case "ArrowLeft":
            console.log("Arrow left clicked");
            inputDir.x = -1;
            inputDir.y = 0;
            break;
        case "ArrowRight":
            console.log("Arrow right clicked");
            inputDir.x = 1;
            inputDir.y = 0;
            break;

        default:
            break;
    }
});