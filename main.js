const cWidth = 1200
const cHeight = 800 

// generates a random number between a min and max
function randomPosition(min, max){
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
}

// draw rectangle to canvas
function addRectangle(){
    var canvas = document.getElementById("canvas1");
    var context = canvas.getContext("2d");
    context.fillStyle = "#D51419";
    l1 = randomPosition(10, cWidth);
    l2 = randomPosition(10, cHeight);
    l3 = randomPosition(20, 200);
    l4 = randomPosition(20, 200);
    // console.log(l1)
    context.fillRect(l1, l2, l3, l4);
}

