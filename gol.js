// The universe of the Game of Life is an infinite, two-dimensional orthogonal grid of square cells, each of which is in one of two possible states, alive or dead, (or populated and unpopulated, respectively). Every cell interacts with its eight neighbours, which are the cells that are horizontally, vertically, or diagonally adjacent. At each step in time, the following transitions occur:

// Any live cell with fewer than two live neighbours dies, as if by underpopulation.
// Any live cell with two or three live neighbours lives on to the next generation.
// Any live cell with more than three live neighbours dies, as if by overpopulation.
// Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.

var canvas;
var matrixXsize = 0;
var matrixYsize = 0;
var sizeCell = 0;
var matrix = [];
let cell; // Declare object

function setup() {
// Sets the screen to be 720 pixels wide and 400 pixels high
// createCanvas(720, 400);
canvas = createCanvas(window.innerWidth, window.innerHeight);
background(0);
noStroke();
ellipseMode(CENTER); // Set ellipseMode is CORNER
sizeCell = 15;
console.log(sizeCell);
matrixXsize= (window.innerWidth+sizeCell)/sizeCell;
matrixYsize= (window.innerHeight+sizeCell)/sizeCell;
console.log(matrixXsize, matrixYsize)
for (let i = 0; i < matrixXsize; i++) {
    let matrixY = [];
    for (let j = 0; j < matrixYsize; j++) {
        matrixY.push(0);
    }
    matrix.push(matrixY)
}
//Initials seeds
for (let index = 0; index < 200; index++) {
    
    matrix[int(random(1*(matrixXsize/5),4*(matrixXsize/5)))][int(random(1*(matrixYsize/5),4*(matrixYsize/5)))] = 1;
}
}

function draw() {
    for (var i = 0; i < matrixXsize; i++) {
        for (var j = 0; j < matrixYsize; j++) {
            var neigh = countLiveNeightbors(i,j);
            var sum = sumNeigh(neigh);
            // Any live cell with fewer than two live neighbours dies, as if by underpopulation.
            if(matrix[i][j] == 1 && sum< 2){
                matrix[i][j] = 0;
            }
            // Any live cell with two or three live neighbours lives on to the next generation.
            if(matrix[i][j] == 1 && sum == 2 || sum == 3){
                matrix[i][j] = 1;
            }
            // Any live cell with more than three live neighbours dies, as if by overpopulation.
            if(matrix[i][j] == 1 && sum > 3){
                matrix[i][j] = 0;
            }
            // Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.
            if(matrix[i][j] == 0 && sum == 3){
                matrix[i][j] = 1;
            }

            if(matrix[i][j] == 0){
               fill(255,255,0);
            }
            else{
               fill(0,255,255,150);
            }
           ellipse(i*sizeCell, j*sizeCell, sum*3);  
        }
    }
}
function sumNeigh(array){
    var sum = 0;
    for (let index = 0; index < array.length; index++) {
        sum += array[index];
    }
    return sum;
}
function countLiveNeightbors(i, j){
    var neightbors = [];
    if(i==matrixXsize-1 && j==matrixYsize-1){
        neightbors.push(matrix[i-1][j-1]);
        neightbors.push(matrix[i-1][j]);
        neightbors.push(matrix[i][j-1]);
    }
    if(i==0 && j==0){
        neightbors.push(matrix[i+1][j+1]);
        neightbors.push(matrix[i][j+1]);
        neightbors.push(matrix[i+1][j]);
    }
    if(i==0 && j==matrixYsize-1){
        neightbors.push(matrix[i+1][j-1]);
        neightbors.push(matrix[i][j-1]);
        neightbors.push(matrix[i+1][j]);
    }
    if(i==matrixXsize-1 && j==0){
        neightbors.push(matrix[i-1][j+1]);
        neightbors.push(matrix[i][j+1]);
        neightbors.push(matrix[i-1][j]);
    }
    //Wall _!
    if(i==matrixXsize-1 && j>0 && j<matrixYsize-1){
        neightbors.push(matrix[i][j-1]);
        neightbors.push(matrix[i-1][j-1]);
        neightbors.push(matrix[i-1][j]);
        neightbors.push(matrix[i-1][j+1]);
        neightbors.push(matrix[i][j+1]);
    }
    //Wall _
    if(j==matrixXsize-1 && i>0 && i<matrixXsize-1){
        neightbors.push(matrix[i-1][j]);
        neightbors.push(matrix[i-1][j-1]);
        neightbors.push(matrix[i][j-1]);
        neightbors.push(matrix[i+1][j-1]);
        neightbors.push(matrix[i+1][j]);
    }
    //Wall |_
    if(i==0 && j>0 && j<matrixYsize-1){
        neightbors.push(matrix[i][j-1]);
        neightbors.push(matrix[i+1][j-1]);
        neightbors.push(matrix[i+1][j]);
        neightbors.push(matrix[i+1][j+1]);
        neightbors.push(matrix[i][j+1]);
    }          
    //Wall -
    if(j==0 && i>0 && i<matrixXsize-1){
        neightbors.push(matrix[i-1][j]);
        neightbors.push(matrix[i-1][j+1]);
        neightbors.push(matrix[i][j+1]);
        neightbors.push(matrix[i+1][j+1]);
        neightbors.push(matrix[i+1][j]);
    }
    if(i>0 && i<matrixXsize-1 && j>0 && j<matrixYsize-1 ){
        neightbors.push(matrix[i+1][j+1]);
        neightbors.push(matrix[i][j+1]);
        neightbors.push(matrix[i+1][j]);
        neightbors.push(matrix[i-1][j-1]);
        neightbors.push(matrix[i][j-1]);
        neightbors.push(matrix[i-1][j]);
        neightbors.push(matrix[i+1][j-1]);
        neightbors.push(matrix[i-1][j+1]);
    }
    return neightbors;
}
