const readline = require('readline');

const fieldCharacter = '░';
const pathCharacter = '*';
const hole = 'O';
const hat = '^';

class Field {
  constructor(field) {
    this.field = field;
    this.playerPos = { x: 0, y: 0 };
    this.gameOver = false;
  }

  print() {
    // Print each row as a string
    for (let row of this.field) {
      console.log(row.join(''));
    }
  }

  move(direction) {
    let { x, y } = this.playerPos;
    switch (direction.toLowerCase()) {
      case 'u':
        y -= 1;
        break;
      case 'd':
        y += 1;
        break;
      case 'l':
        x -= 1;
        break;
      case 'r':
        x += 1;
        break;
      default:
        console.log('Invalid input. Use U, D, L, or R.');
        return false;
    }
    // Check bounds
    if (y < 0 || y >= this.field.length || x < 0 || x >= this.field[0].length) {
      console.log('You moved outside the field! Game over.');
      this.gameOver = true;
      return true;
    }
    // Check tile
    const tile = this.field[y][x];
    if (tile === hole) {
      console.log('You fell into a hole! Game over.');
      this.gameOver = true;
      return true;
    } else if (tile === hat) {
      console.log('You found your hat! You win!');
      this.gameOver = true;
      return true;
    }
    // Mark path
    this.field[y][x] = pathCharacter;
    this.playerPos = { x, y };
    return false;
  }
}

function playGame(fieldInstance) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  function askMove() {
    fieldInstance.print();
    rl.question('Which way? (U/D/L/R): ', (answer) => {
      const end = fieldInstance.move(answer);
      if (fieldInstance.gameOver) {
        fieldInstance.print();
        rl.close();
        return;
      }
      askMove();
    });
  }
  askMove();
}

// Test instance for playing
const myField = new Field([
  ['*', '░', 'O'],
  ['░', 'O', '░'],
  ['░', '^', '░'],
]);

playGame(myField);
