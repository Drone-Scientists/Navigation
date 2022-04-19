// This file handles all click events on the canvas element

var mouse;
let canvas = document.getElementById("canvas1");
let nodeSelected = false
let selectedNodeName;

canvas.addEventListener("click",  
function(event) {

    mouse = oMousePos(canvas, event)
    console.log(mouse)

    // node already selected
    if(nodeSelected == true){
        if(canvasV == null){
            alert("no canvasV in eventListener")
            return
        }
        if(!matrix.updateNodePositionByName(selectedNodeName, mouse.x, mouse.y)){
            alert("didn't change node position")
            return
        }
        let nodes = matrix.getNodes()
        canvasV.eraseCanvas()
        canvasV.drawMatrix(nodes)
        canvasV.redrawEdges(nodes)
        nodeSelected = false
        selectedNodeName = null
        return
    }

    selectedNodeName = mouseOverNode(mouse)
    if(selectedNodeName){
        nodeSelected = true
    }
},);

function oMousePos(canvas, evt) {
  var ClientRect = canvas.getBoundingClientRect();
  return {
    x: Math.round(evt.clientX - ClientRect.left),
    y: Math.round(evt.clientY - ClientRect.top)
    }
}

function mouseOverNode(mouse){
    if(matrix == null){
        alert("You need to create a matrix first")
        return
    }
    nodes = matrix.getNodes()
    for(i in nodes){
        let dist = computeDistance(mouse.x, mouse.y,
             nodes[i].x, nodes[i].y);
        if(dist < 23){
            return nodes[i].name
        }
    }
    return false
}

function computeDistance(x1, y1, x2, y2){
    let y = x2 - x1;
    let x = y2 - y1;
    return Math.round(Math.sqrt(x * x + y * y));
}