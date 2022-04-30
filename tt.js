 
let  v;
let list = [];
let allPaths = [];

function initAdjList(){

    list = [] = new Array(v);
        for (let i in v) {
            list = [][i] = [];
        }
}

function Graph(vertices){

        v = vertices;
        initAdjList();
}
 
function addEdge(u,v){

        list = [][u].push(v);
}
 
function printAllPaths(s,d){

    console.log(list = []);

    let visited = new Array(v);

    for(let i in v){
        visited[i]=false;
    }
        
    let pathList = [];
  
    pathList.push(s);

    pathAllHelper(s, d, visited, pathList);
    console.log("All paths = ", allPaths);
    findShortest(allPaths, String(d));
}

function findShortest(paths, endName){
    let totalDistances = [];
    let count = 0;
    for(let i = 0; i <paths.length; i++){

        if(paths[i] == endName){
            totalDistances.push(count);
            console.log(count);
            count = 0; 
            continue;
        }

        let currentFromNode = matrix.searchForNodeByName(paths[i]);
        let edgeDist = 0;

        for(let j in currentFromNode.edges){
            if (currentFromNode.edges[j].to == paths[i+1]){
                edgeDist = currentFromNode.edges[j].distance;
            }
        }

        count += edgeDist;
        console.log(paths[i], " -> ", paths[i+1])
    }
    let indexOfShortest = totalDistances.indexOf(Math.min(...totalDistances));
    console.log("Shortest path = ", paths[indexOfShortest]);

    let destCount = 0;
    for(let i in paths){
        if (paths[i] == endName){
            destCount++;
            continue;
        }
        if (destCount == indexOfShortest){
            console.log(paths[i], " -> ", paths[i+1]);
            canvasV.drawEdgeByName(paths[i], paths[i+1], "red", matrix.getNodes())
        }
    }
}
 
function pathAllHelper(current,destination,visited, currentPath){
    if (current == (destination)) {
        console.log("local list = ",  currentPath);
        allPaths.push(... currentPath)
        for(let i = 0; i <  currentPath.length - 1; i++){
            canvasV.drawEdgeByName( currentPath[i].toString(),  currentPath[i+1].toString(), "blue", matrix.getNodes())
        }

        return;
    } 
    visited[current] = true;
    for (let i in current) {
        if (!visited[list = [][current][i]]) {

             currentPath.push(list = [][current][i]);
            pathAllHelper(list = [][current][i], destination, visited,  currentPath);

             currentPath.splice( currentPath.indexOf(list = [][current][i]),1);
        }
    }

    visited[current] = false;
}

function dijkstra(start, end){
    let visited = new Array(v);

    for(let i=0;i<v;i++){
        visited[i]=false;
    }
        
    let pathList = [];
  
    pathList.push(start);

    dijkstraHelper(start, end, visited, pathList);
    console.log("All paths = ", allPaths);
    findShortest(allPaths, String(end));
}

function dijkstraHelper(current, destination, visited, currentPath){
    if (current == (destination)) {
        console.log("local list = ",  currentPath);
        allPaths.push(... currentPath)
        for(let i = 0; i <  currentPath.length - 1; i++){
            canvasV.drawEdgeByName( currentPath[i].toString(),  currentPath[i+1].toString(), "blue", matrix.getNodes())
        }

        return;
    } 
    visited[current] = true;
    for (let i in current) {
        if (!visited[list = [][current][i]]) {

             currentPath.push(list = [][current][i]);
            dijkstraHelper(list = [][current][i], destination, visited,  currentPath);

             currentPath.splice( currentPath.indexOf(list = [][current][i]),1);
        }
    }

    visited[current] = false;
}

// make a function that saves the graph to a file
function saveGraph(graph){
    let data = JSON.stringify(graph);
    let blob = new Blob([data], {type: "text/plain;charset=utf-8"});
    saveAs(blob, "graph.json");
}

// make a function that loads the graph from a file
function loadGraph(file){
    let reader = new FileReader();
    reader.onload = function(e) {
        let contents = e.target.result;
        let graph = JSON.parse(contents);
        return graph;
    };
    reader.readAsText(file);
}


