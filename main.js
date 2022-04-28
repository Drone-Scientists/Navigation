let matrix; // instance of model.js matrix
let canvasV; // instance of view.js canvasView 
// Below are a set of controllers

// creates a new instance of a model.js matrix
function createNodeMatrix(){

     // validate user input from the matrix input boxes
    if(!validateMatrixInputs()){
        return
    }

    // create new canvasView
    currentCanvasView = new canvasView
    result = currentCanvasView.userCreateMatrixInput()
    if(result == null){
        alert("couldn't get matrix in createNodeMatrix")
        return
    }

    // check to see if user input is within bounds
    let rows = result[0]
    // console.log(rows)
    if (rows < 1){
        alert("Invalid rows in addNodeMatrix")
        delete currentCanvasView
    }

    let cols = result[1]
    // console.log(cols)
    if (rows < 1){
        alert("Invalid cols in addNodeMatrix")
        delete currentCanvasView
    }

    let numOfNodes = result[2]
    // console.log(numOfNodes)
    if (numOfNodes > rows * cols){
        alert("To many numOfNodes in addNodeMatrix")
        delete currentCanvasView
    }
    let distanceBetweenNodes = result[3]
    // console.log(distanceBetweenNodes)
    if (rows < 1){
        alert("Invalid distanceBetweenNodes in addNodeMatrix")
        delete currentCanvasView
    }

    // create new matrix
    currentMatrix = new Matrix(rows, cols, numOfNodes, distanceBetweenNodes);
    if (!currentMatrix){
        alert("no current matrix")
        delete currentCanvasView
        return
    }

    // get the nodes in currentMatrix
    matrixNodes = currentMatrix.getNodes();
    // console.log(matrixNodes)
    
    if(!currentCanvasView.drawMatrix(matrixNodes)){
        delete currentMatrix
        delete currentCanvasView
        return
    }
    canvasV = currentCanvasView
    matrix = currentMatrix
}

// Checks if a matrix create user input box is empty and changes 
// the styling according
function validateMatrixInputs(){

    // rows input box
    let rows = document.getElementById("rows").value;
    if(rows == ""){
        alert("Enter correct rows");
        document.getElementById("rows").style.borderColor = "red";
        return false;
    }else{
       document.getElementById("rows").style.borderColor = "green";
    }

    // cols input box
    let cols = document.getElementById("cols").value;
    if(cols == ""){
        alert("Enter correct cols");
        document.getElementById("cols").style.borderColor = "red";
        return false;
    }else{
        document.getElementById("cols").style.borderColor = "green";
    }

    // numOfNodes input box
    let numOfNodes = document.getElementById("numOfNodes").value;
    if(numOfNodes == ""){
        alert("Enter correct number of nodes");
        document.getElementById("numOfNodes").style.borderColor = "red";
        return false;
    }else{
        document.getElementById("numOfNodes").style.borderColor = "green";
    }

    // spacing input box
    let spacing = document.getElementById("spacing").value;
    if(spacing == ""){
        alert("Enter correct spacing");
        document.getElementById("spacing").style.borderColor = "red";
        return false;
    }else{
        document.getElementById("spacing").style.borderColor = "green";
    }   
    return true
}

// clears the canvas for redrawing and destroys matrix and canvasV
function clearCanvas(){
    if(!matrix){
        alert("Create a matrix before clearing")
        return
    }
    if(!canvasV){
        alert("couldn't clear canavsV")
        return
    }
    delete canvasV;
    delete matrix;
    let canvas = document.getElementById("canvas1");
    let context = canvas.getContext("2d");
    context.clearRect(0, 0, canvas.width, canvas.height);
}

// create an edge / connection
function createEdge(){

     if(matrix == null){
        alert("Matrix is not created")
        return
    }

    let result = document.getElementById("addEdge").value;
    if(result == ""){
        alert("Enter a connection into the box")
        return
    }

    // format input
    result = result.split(" ");
    let threePrams = false;
    if(result.length == 3){
        threePrams = true;
    }
    if(result.length != 2 && !threePrams){
        alert("Enter a connection into the box")
        return
    }

    let fromNodeName = result[0];
    let toNodeName = result[1];
    let x1, x2, y1, y2
    let nodes = matrix.getNodes()
    for(let i in nodes){
        if(nodes[i].name == fromNodeName){
            // console.log(nodes[i].name)
            x1 = nodes[i].x
            y1 = nodes[i].y
        }
        else if(nodes[i].name == toNodeName){
            x2 = nodes[i].x
            y2 = nodes[i].y
        }
    }

    if(canvasV == null){
        alert("Canvas doesn't exist in createEdge")
        return
    }

    // draw the edge and redraw circles on top
    canvasV.drawEdge(x1, y1, x2, y2)
    canvasV.drawCircle(x1, y1, 20, 'green')
    canvasV.drawCircle(x2, y2, 20, 'green')

    let rotLine1 = canvasV.rotateLineAngle(x1, y1, x2, y2, 10)
    while(canvasV.calculateDistance(...rotLine1) > 30){
        rotLine1 = canvasV.doubleCutAroundMid(...rotLine1)
    }

    let rotLine2 = canvasV.rotateLineAngle(x1, y1, x2, y2, -10)
    while(canvasV.calculateDistance(...rotLine2) > 30){
        rotLine2 = canvasV.doubleCutAroundMid(...rotLine2)
    }

    rotLine1 = canvasV.cutRightHalf(...rotLine1)
    rotLine2 = canvasV.cutRightHalf(...rotLine2)

    canvasV.drawEdge(...rotLine1)
    canvasV.drawEdge(...rotLine2)
    
    // update matrix.edges
    if (threePrams){
        matrix.addEdge(fromNodeName, toNodeName, result[2])
        return
    }
    matrix.addEdge(fromNodeName, toNodeName, 1)


    // matrix.updateNodeEdgeByName(result[1], result[0])
}

// Computes the midpoint of a line
function computeTheMidpoint(x1, y1, x2, y2){
    if( typeof x1 != "number" || 
        typeof y1 != "number" ||
        typeof x2 != "number" ||
        typeof y2 != "number"){
        return
    }

    let x = (x1 + x2) / 2
    let y = (y1 + y2) / 2
    return [x, y];
}

// rotates a vector in respect to some angle
function rotationVector(x1, y1, x2, y2, angle){

    if( typeof x1 != "number" || 
        typeof y1 != "number" ||
        typeof x2 != "number" ||
        typeof y2 != "number" ||
        typeof angle != "number"){
        return
    }
    
    let c = Math.PI / 180;
    let radians = angle * c;
    let newX1 = x1 * cos(radians)
    let newY1 = y1 * sin(radians)
    let newX2 = x2 * cos(-radians)
    let newY2 = y2 * sin(-radians)
    return [newX1, newY1, newX2, newY2]
}

// upload a file
async function uploadFile(){
    let e = document.getElementById("file").files[0];
    let formData = new FormData();
    formData.append("text", e);
    fetch('/upload.', {method: "POST", body: formData})
}

// returns a random number between a min and max value
function randomPosition(min, max){
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
}

function squareGreaterThanTen(vel){
    if(vel >= 10){
        vel *= vel
    }
    return vel
}

function printEdges(){
    if(matrix == null){
        alert("Matrix is not created")
        return
    }
    let edges = matrix.getEdges()
    for(let i in edges){
        console.log(i, " ", edges[i])
    }
}

function findAllPaths(){

}