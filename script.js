let maze = document.getElementById('maze-container');
// let Level = document.getElementById('level-select');
let pacman = document.getElementById('pacman');
let ghost = document.getElementById('ghost');

// Level.addEventListener('change', function(){
//     let level = Level.value;
//     if(level == 1){
//         mazeArray = level1;
//     }
//     if(level == 2){
//         mazeArray = level2;
//     }
//     if(level == 3){
//         mazeArray = level3;
//     }
//     maze.innerHTML = `
//     <img src="pacman.svg" id="pacman" 
//         width="50px" height="50px"
//         alt="pacman">

//         <img src="ghost.svg" id="ghost"
//         width="50px" height="50px"
//         alt="ghost">
//     `;
//     createMaze();
// })


function setpacmanPosition(x,y){
    pacman.style.top = x + 'px';
    pacman.style.left = y + 'px';
}

function setghostPosition(x,y){
    ghost.style.bottom = x + 'px';
    ghost.style.right = y + 'px';
}


let mazeArray= level3; // initially one, will change on choosing 
// 0 is wall, 1 is space, 2 is pacman current position 
function createMaze(){
    for(let i = 0; i < mazeArray.length; i++){
        let row = document.createElement('div');
        row.classList.add('row');
        for(let j = 0; j < mazeArray[i].length; j++){
            let cell = document.createElement('div');
            cell.classList.add('cell');
            if(mazeArray[i][j] == 0){
                cell.classList.add('wall');
            }
            row.appendChild(cell);

            if(i == 0 && j == 0){
                mazeArray[i][j] = 2
            }
        }
        maze.appendChild(row)
    }
    setpacmanPosition(0,0);
    setghostPosition(0,0);
}


function getpacmanPosition(){
    let position = [-1,-1];
    for(let i = 0; i < mazeArray.length; i++){
        for(let j = 0; j < mazeArray[i].length; j++){
            if(mazeArray[i][j] == 2){
                position[0] = i;
                position[1] = j;
            }
        }
    }
    console.log(position);
    return position;
}


document.addEventListener('keydown' , function(e){
    let pacmanLeft = pacman.offsetLeft;
    let pacmanTop = pacman.offsetTop;
    let ghostLeft= ghost.offsetLeft;
    let ghostTop = ghost.offsetTop ;
    let pacmanPosition = getpacmanPosition();
    
    if(e.key == 'ArrowRight' 
    && pacmanLeft < (mazeArray.length - 1) * 50 
    && mazeArray[pacmanPosition[0]][pacmanPosition[1] + 1] == 1)
    {
        pacmanLeft += 50;
        pacman.style.left = pacmanLeft + 'px';
        mazeArray[pacmanPosition[0]][pacmanPosition[1]] = 1;
        mazeArray[pacmanPosition[0]][pacmanPosition[1] + 1] = 2;

    }

    if(e.key == 'ArrowLeft' 
    && pacmanLeft > 0 
    && mazeArray[pacmanPosition[0]][pacmanPosition[1] - 1] == 1)
    {
        pacmanLeft -= 50;
        pacman.style.left = pacmanLeft + 'px';
        mazeArray[pacmanPosition[0]][pacmanPosition[1]] = 1;
        mazeArray[pacmanPosition[0]][pacmanPosition[1] - 1] = 2;
    }

    if(e.key == 'ArrowUp'
    && pacmanTop > 0
    && mazeArray[pacmanPosition[0] - 1][pacmanPosition[1]] == 1)
    {
        pacmanTop -= 50;
        pacman.style.top = pacmanTop + 'px';
        mazeArray[pacmanPosition[0]][pacmanPosition[1]] = 1;
        mazeArray[pacmanPosition[0] - 1][pacmanPosition[1]] = 2;
    }

    if(e.key == 'ArrowDown'
    && pacmanTop < (mazeArray.length -1)*50 
    && mazeArray[pacmanPosition[0] + 1][pacmanPosition[1]] == 1)
    {
        pacmanTop += 50;
        pacman.style.top = pacmanTop + 'px';
        mazeArray[pacmanPosition[0]][pacmanPosition[1]] = 1;
        mazeArray[pacmanPosition[0] + 1][pacmanPosition[1]] = 2;
    }

    if(pacmanLeft == ghostLeft && pacmanTop == ghostTop){
        let resultMessage = document.createElement('div');
        resultMessage.classList.add('result-message');
        resultMessage.textContent = "You Won! ";
        document.body.appendChild(resultMessage);
    }
})