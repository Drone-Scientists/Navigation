class Node{
    edges = [];
    constructor(x, y, name) {
        this.x = x
        this.y = y
        this.name = name
        this.color = "green"
    }
}

class Edge{
    constructor(to, distance){
        this.to = to
        this.distance = distance
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
        console.log(this.nodes)
    }

    getNumberOfNodes(){
        let count = 0
        for(let i in this.nodes){
            count += 1;
        }
        return count
    }

    getEdges(){
        let edges = []
        for(let i = 0; i < this.nodes.length; i++){
            let edgesList = this.nodes[i].edges;
            edges.push(edgesList)
        }
        return edges
    }

    getNodes(){
        return this.nodes
    }

    setNodes(nodes){
        this.nodes = nodes
    }

    searchForNodeByName(name){
        for(let i in this.nodes){
            if(this.nodes[i].name == name){
                return this.nodes[i]
            }
        }
        return null
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

    addEdge(fromEdge, toEdge, dist){
        let fromNode = this.searchForNodeByName(fromEdge)
        let toNode = this.searchForNodeByName(toEdge)
        if(fromNode == null || toNode == null){
            return
        }
        let newEdge = new Edge(Number(toEdge), Number(dist))
        fromNode.edges.push(newEdge);
        return
    }
}