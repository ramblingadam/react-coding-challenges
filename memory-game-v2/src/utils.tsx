class CardClass {
  value: number
  selected: boolean
  cleared: boolean
  constructor(value: number, selected: boolean = false, cleared: boolean = false) {
    this.value = value
    this.selected = selected
    this.cleared = cleared
  }
}

function shuffle(array) {
  var m = array.length, t, i;

  // While there remain elements to shuffle…
  while (m) {

    // Pick a remaining element…
    i = Math.floor(Math.random() * m--);

    // And swap it with the current element.
    t = array[m];
    array[m] = array[i];
    array[i] = t;
  }

  return array;
}



const buildDeck = (numbers) => {
  const deck = []
  // let rowSize:number = 0
  // switch(difficulty) {
  //   case 'easy':
  //     rowSize = 5
  //     break
  //   case 'medium':
  //     rowSize = 6
  //     break
  //   case 'hard':
  //     rowSize = 8
  //     break
  // }
  
  for (let i = 0; i < numbers; i++) {
    deck.push(new CardClass(i))
    deck.push(new CardClass(i))
  }
  return shuffle(deck)
}

export default buildDeck