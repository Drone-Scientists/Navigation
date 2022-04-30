function rotateLineAngle(x1, y1, x2, y2, angle) {
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
function cutRightHalf(x1, y1, x2, y2) {
    let xMid = (x1 + x2) / 2;
    let yMid = (y1 + y2) / 2;
    return [xMid, yMid, x2, y2]
}

function cutLeftHalf(x1, y1, x2, y2) {
    let xMid = (x1 + x2) / 2;
    let yMid = (y1 + y2) / 2;
    return [x1, y1, xMid, yMid]
}

// test rotateLine
console.log("Hello world")
let line = [2, 2, 8, 2];
let rotatedLine = rotateLine(...line);
console.log(rotatedLine);