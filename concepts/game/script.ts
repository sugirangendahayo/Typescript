type myDirection = "ArrowUp" | "ArrowDown" | "ArrowLeft" | "ArrowRight";
const carBox = document.querySelector(".car-box") as HTMLDivElement;
const btn = document.getElementById("btn") as HTMLButtonElement;


document.addEventListener("keydown", function(e: KeyboardEvent){
    const direction = e.key as myDirection;
  switch(direction){
    case "ArrowUp":
        console.log("Moving Up!");
        break;
    case "ArrowDown":
        console.log("Moving Down!");
        break;
    case "ArrowLeft":
        console.log("Moving Left");
        break;
    case "ArrowRight":
        console.log("Moving Right!");
        break;
    default:
        console.log("Wrong enterred key, try again...");
        break;
  }
})
