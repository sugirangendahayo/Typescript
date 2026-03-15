var carBox = document.querySelector(".car-box");
var btn = document.getElementById("btn");
document.addEventListener("keydown", function (e) {
    var direction = e.key;
    switch (direction) {
        case "ArrowUp":
            console.log("Moving Up!");
            break;
        case "ArrowDown":
            console.log("Moving Down!");
            break;
        case "ArrowLeft":
            console.log("Moving Left!");
            break;
        case "ArrowRight":
            console.log("Moving Right!");
            break;
        default:
            console.log("Wrong enterred key, try again...");
            break;
    }
});
