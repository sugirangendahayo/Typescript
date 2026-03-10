// function move(direction: number, distance: boolean) {}

// // TESTS

// move('up', 10);
// move('left', 5);

// move(
//   // @ts-expect-error - "up-right" is not a valid direction
//   'up-right',
//   10
// );

// move(
//   // @ts-expect-error - "down-left" is not a valid direction
//   'down-left',
//   20
// );

// move(
//   'up',
//   // @ts-expect-error - "20" is not a valid distance
//   '20'
// );
//
//
type Direction = "Up" | "Down" | "Left" | "Right";

function move(direction: Direction, distance: number) {
  console.log(`Moving ${direction} by ${distance} cm`);
}
move("Right", 25);
