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
        // console.log(matrixNodes)  
        let mnLength = matrixNodes.length;
        for(let i = 0; i < mnLength; i++){
            let x = matrixNodes[i].x
            let y = matrixNodes[i].y
            if(!this.drawCircle(x, y, 20, 'green')){
                let name = matrixNodes[i].name
                alert("Unable to draw node " + name)
                return false
            }
        }
        return true
    }

    // draws a circle on a canvas
    drawCircle(x, y, r, color){
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
        this.context.fillStyle = color;
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

    drawEdgeByName(firstName, secondName, color, nodes){
        // console.log("secondName", secondName);
        // console.log("firstName", firstName);
        let firstNode = this.searchNodesByName(firstName, nodes);
        let secondNode = this.searchNodesByName(secondName, nodes);
        let x1 = firstNode.x;
        let y1 = firstNode.y;
        let x2 = secondNode.x;
        let y2 = secondNode.y;

        this.context.strokeStyle = color;
        this.context.lineWidth = 2;
        this.context.beginPath();
        this.context.moveTo(x1, y1);
        this.context.lineTo(x2, y2);
        this.context.stroke();

        this.drawCircle(x1, y1, 20, "green");
        this.drawCircle(x2, y2, 20, "green");
    }

    searchNodesByName(name, nodes){
        if(!nodes){
            alert("nodes empty in searchNodesByName")
            return
        }
        for(let i in nodes){
            if(nodes[i].name == name){
                return nodes[i]
            }
        }
        return false
    }

    // redraws all the edges / connections on the canvas
    redrawEdges(nodes){
        // console.log("redrawing edges")
        let filteredNodes = nodes.filter(node => node.edges.length > 0);
        // console.log(filteredNodes)
        for(let i in filteredNodes){
            let fromNodeX = filteredNodes[i].x
            let fromNodeY = filteredNodes[i].y
            let fromNode = filteredNodes[i]
            for(let j in fromNode.edges){
                console.log("From node edge name:", fromNode.edges[j].to)
                let toNode = this.searchNodesByName(fromNode.edges[j].to, nodes)
                console.log("To node:",toNode)
                let toNodeX = toNode.x
                let toNodeY = toNode.y

                // console.log("got here")
                // console.log("FromNodeX", fromNodeX)
                // console.log("FromNodeY", fromNodeY)
                // console.log("ToNodeX", toNodeX)
                // console.log("ToNodeY", toNodeY)
                
                this.drawEdge(fromNodeX, fromNodeY, toNodeX, toNodeY) 
                this.drawCircle(fromNodeX, fromNodeY, 20, 'green')
                this.drawCircle(toNodeX, toNodeY, 20, 'green')

                let rotLine1 = this.rotateLineAngle(fromNodeX, fromNodeY, toNodeX, toNodeY, 10)
                while(this.calculateDistance(...rotLine1) > 30){
                    rotLine1 = this.doubleCutAroundMid(...rotLine1)
                }
            
                let rotLine2 = this.rotateLineAngle(fromNodeX, fromNodeY, toNodeX, toNodeY, -10)
                while(this.calculateDistance(...rotLine2) > 30){
                    rotLine2 = this.doubleCutAroundMid(...rotLine2)
                }
                // console.log("before")
                // console.log(rotLine1)
                rotLine1 = this.cutRightHalf(...rotLine1)
                // console.log(rotLine1)
                // console.log("after")
                rotLine2 = this.cutRightHalf(...rotLine2)
            
                this.drawEdge(...rotLine1)
                this.drawEdge(...rotLine2)
            }
        }
  
    }

    redrawEdgesDeprecated(nodes){
        let filteredNodes = nodes.filter(node => node.edges.length > 0);
        for(let i in filteredNodes){ // REALLY DUMB

            let x1 = filteredNodes[i].x
            let y1 = filteredNodes[i].y

            for(let j in filteredNodes[i].edges){

                if(filteredNodes[i].edges[j] == null){
                    continue
                }

                for(let w in filteredNodes){

                    if(filteredNodes[w].name != filteredNodes[i].edges[j]){
                        continue
                    }
                    // console.log("w: " + filteredNodes[w].name)

                    let x2 = filteredNodes[w].x
                    let y2 = filteredNodes[w].y
                    this.drawEdge(x1, y1, filteredNodes[w].x, filteredNodes[w].y) 
                    this.drawCircle(x1, y1, 20, 'green')
                    this.drawCircle(filteredNodes[w].x, nodes[w].y, 20, 'green')

                    let rotLine1 = this.rotateLineAngle(x1, y1, x2, y2, 10)
                    while(this.calculateDistance(...rotLine1) > 30){
                        rotLine1 = this.doubleCutAroundMid(...rotLine1)
                    }
                
                    let rotLine2 = this.rotateLineAngle(x1, y1, x2, y2, -10)
                    while(this.calculateDistance(...rotLine2) > 30){
                        rotLine2 = this.doubleCutAroundMid(...rotLine2)
                    }
                    // console.log("before")
                    // console.log(rotLine1)
                    rotLine1 = this.cutRightHalf(...rotLine1)
                    // console.log(rotLine1)
                    // console.log("after")
                    rotLine2 = this.cutRightHalf(...rotLine2)
                
                    this.drawEdge(...rotLine1)
                    this.drawEdge(...rotLine2)
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

    rotateLineAngle(x1, y1, x2, y2, angle) {
        let xMid = (x1 + x2) / 2;
        let yMid = (y1 + y2) / 2;
        let x1New = x1 - xMid;
        let y1New = y1 - yMid;
        let x2New = x2 - xMid;
        let y2New = y2 - yMid;
        let x1NewRot = x1New * Math.cos(angle) - y1New * Math.sin(angle);
        let y1NewRot = x1New * Math.sin(angle) + y1New * Math.cos(angle);
        let x2NewRot = x2New * Math.cos(angle) - y2New * Math.sin(angle);
        let y2NewRot = x2New * Math.sin(angle) + y2New * Math.cos(angle);
        let x1NewRotFinal = x1NewRot + xMid;
        let y1NewRotFinal = y1NewRot + yMid;
        let x2NewRotFinal = x2NewRot + xMid;
        let y2NewRotFinal = y2NewRot + yMid;
        return [x1NewRotFinal, y1NewRotFinal, x2NewRotFinal, y2NewRotFinal];
    }
    
    // create a function that takes in a line and cuts off one half of the line
    cutRightHalf(x1, y1, x2, y2) {
        let xMid = (x1 + x2) / 2;
        let yMid = (y1 + y2) / 2;
        return [xMid, yMid, x2, y2]
    }
    
    cutLeftHalf(x1, y1, x2, y2) {
        let xMid = (x1 + x2) / 2;
        let yMid = (y1 + y2) / 2;
        return [x1, y1, xMid, yMid]
    }
    
    doubleCutAroundMid(x1, y1, x2, y2) {
        let xMid = (x1 + x2) / 2;
        let yMid = (y1 + y2) / 2;
        let fxMid = (xMid + x1) / 2;
        let fyMid = (yMid + y1) / 2;
        let sxMid = (xMid + x2) / 2;
        let syMid = (yMid + y2) / 2;
        return [fxMid, fyMid, sxMid, syMid] // return the midpoints of the two halves
    }
    
    calculateDistance (x1, y1, x2, y2) {
        let x = x2 - x1;
        let y = y2 - y1;
        return Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
    }

    findIntersection(x1, y1, x2, y2, x3, y3, x4, y4) {
        let numX = (x1 * y2 - y1 * x2) * (x3 - x4) - (x1 - x2) * (x3 * y4 - y3 * x4)
        let denX = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4)
        let numY = (x1 * y2 - y1 * x2) * (y3 - y4) - (y1 - y2) * (x3 * y4 - y3 * x4)
        let denY = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4)
        let x = numX / denX
        let y = numY / denY
        return [x, y];
    }

    findSlope(x1, y1, x2, y2) {
        let m = (y2 - y1) / (x2 - x1)
        return m
    }

    findPoint(m, x, y, d) {
        let x1 = x + d * Math.cos(Math.atan(m))
        let y1 = y + d * Math.sin(Math.atan(m))
        return [x1, y1]
    }
}
