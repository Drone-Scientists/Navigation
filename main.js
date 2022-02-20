let square_top = 50;
let square_left = 50;

let body = document.getElementById("main-body");
body.addEventListener("keydown", function (e) {
    if (e.key === "w") {
        square_top -= 1;
        document.getElementById("s1").style.top = square_top + "%";
    }
    else if(e.key === "s"){
        square_top += 1;
        document.getElementById("s1").style.top = square_top + "%"; 
    }
    else if(e.key === "a"){
        square_left -= 1;
        document.getElementById("s1").style.left = square_left + "%"; 
    }
    else if(e.key === "d"){
        square_left += 1;
        document.getElementById("s1").style.left = square_left + "%"; 
    }
    if(e.key === "d" && e.key === "w"){
        square_left += 1;
        square_top -= 1;
        document.getElementById("s1").style.left = square_left + "%"; 
        document.getElementById("s1").style.left = square_top + "%"; 
    }
});
