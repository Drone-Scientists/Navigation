class Node{
    edges = [];
    constructor(x, y, name) {
        this.x = x
        this.y = y
        this.name = name
        this.color = "green"
    }
}

class Matrix{
    nodes = []
    constructor(rows, cols, numOfNodes, distanceBetweenNodes){
        // create all the nodes with coordinates, with respect to rows/cols
        let noNodes = numOfNodes
        if(rows * cols < noNodes){
            return -1
        }
        let x = 1
        let y = 1
        for(let i = 1; i < noNodes + 1; i++){ 
            if(x > cols){
                x = 1
                y++
            }
            let nodeX = x * distanceBetweenNodes + 50
            let nodeY = y * distanceBetweenNodes + 50
            let node = new Node(nodeX, nodeY, i)
            this.nodes.push(node)
            // console.log(" x: " + x + " y: " + y + " i: " + i)
            x++
        }
    }

    printNodes(){
        // console.log(this.nodes)
    }

    getNodes(){
        return this.nodes
    }

    // changes the value of node.edges
    updateNodeEdgeByName(name, edgeName){
        for(let i in this.nodes){
            if(this.nodes[i].name == name){
                this.nodes[i].edges.push(edgeName)
                // console.log(this.nodes[i].edges)
            }
        }
    }  

    // changes the position of a node by referencing the nodes name
    updateNodePositionByName(name, x2, y2){
        if(this.nodes == null){
            // console.log("nodes is null in updateNodePositionByName");
            return
        }
        for(let i in this.nodes){
            if(this.nodes[i].name == name){
                this.nodes[i].x = x2
                this.nodes[i].y = y2
                return true
            } 
        }
        return false
    }
}