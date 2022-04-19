class canvasView{
    
    constructor(){
        this.canvas = document.getElementById("canvas1")
        this.context = canvas.getContext('2d');
    }

    // create matrix input box
    userCreateMatrixInput(){ 
        if (!this.canvas) {
            alert("no canvas in userCreateMatrixInput")
            return;
        }
        if (!this.context) {
            alert("no context in userCreateMatrixInput")
            return;
        }
        this.context.clearRect(0, 0, canvas.width, canvas.height);
        let rows = parseInt(document.getElementById("rows").value)
        let cols = parseInt(document.getElementById("cols").value)
        let numOfNodes = parseInt(document.getElementById("numOfNodes").value)
        let distanceBetweenNodes = parseInt(document.getElementById("spacing").value)
        return [rows, cols, numOfNodes, distanceBetweenNodes]
    }

    // draw the respective matrix on the canvas
    drawMatrix(matrixNodes){
        if(!matrixNodes){
            alert("matrixNodes empty in drawMatrix")
            return
        }
        console.log(matrixNodes)  
        let mnLength = matrixNodes.length;
        for(let i = 0; i < mnLength; i++){
            let x = matrixNodes[i].x
            let y = matrixNodes[i].y
            if(!this.drawCircle(x, y, 20)){
                let name = matrixNodes[i].name
                alert("Unable to draw node " + name)
                return false
            }
        }
        return true
    }

    // draws a circle on a canvas
    drawCircle(x, y, r){
        if (!this.canvas) {
            alert("no canvas in drawCircle")
            return;
        }
        if (!this.context) {
            alert("no context in drawCircle")
            return;
        }
        this.context.beginPath();
        this.context.arc(x, y, r, 0, 2 * Math.PI, false);
        this.context.fillStyle = 'green';
        this.context.fill();
        this.context.lineWidth = 2;
        this.context.strokeStyle = '#003300';
        this.context.stroke();
        return true
    }

    // draws an edge / connection on canvas
    drawEdge(x1, y1, x2, y2){
        if (!this.canvas) {
            alert("no canvas in drawEdge")
            return;
        }
        if (!this.context) {
            alert("no context in drawEdge")
            return;
        }
        this.context.strokeStyle = 'black';
        this.context.lineWidth = 2;
        this.context.beginPath();
        this.context.moveTo(x1, y1);
        this.context.lineTo(x2, y2);
        this.context.stroke();   
    }

    // redraws all the edges / connections on the canvas
    redrawEdges(nodes){
        let filteredNodes = nodes.filter(node => node.edges != null);
        for(let i in filteredNodes){ // REALLY DUMB
            let x1 = filteredNodes[i].x
            let y1 = filteredNodes[i].y
            for(let j in filteredNodes[i].edges){
                if(filteredNodes[i].edges[j] != null){
                    for(let w in filteredNodes){
                        if(filteredNodes[w].name == filteredNodes[i].edges[j]){
                            this.drawEdge(x1, y1, filteredNodes[w].x, filteredNodes[w].y) 
                            this.drawCircle(x1, y1, 20)
                            this.drawCircle(filteredNodes[w].x, nodes[w].y, 20)
                            let result = computeTheMidpoint(x1, y1, filteredNodes[w].x, filteredNodes[w].y )
                            if(result == null){
                                alert("couldn't compute mid point")
                                return
                            }
                            console.log(result)

                            if(!this.drawCircle(result[0], result[1], 3)){
                                console.log("couldn't re draw")
                            }
                        }
                    }
                }
            }
        }
    }

    eraseCanvas(){
        if (!this.canvas) {
            alert("no canvas in eraseCanvas")
            return;
        }
        if (!this.context) {
            alert("no context in eraseCanvas")
            return;
        }
        this.context.clearRect(0, 0, canvas.width, canvas.height); 
    }  
}