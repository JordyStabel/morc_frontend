let suits = {
  0: "H",
  1: "S",
  2: "C",
  3: "D"
};

const initialData = {
  cards: {
    "card-1": {
      id: "penis",
      img: `/images/${Math.floor(Math.random() * 9 + 2)}${
        suits[Math.floor(Math.random() * 3)]
      }.svg`
    },
    "card-2": {
      id: "card-2",
      img: `/images/${Math.floor(Math.random() * 9 + 2)}${
        suits[Math.floor(Math.random() * 3)]
      }.svg`
    },
    "card-3": {
      id: "card-3",
      img: `/images/${Math.floor(Math.random() * 9 + 2)}${
        suits[Math.floor(Math.random() * 3)]
      }.svg`
    },
    "card-4": {
      id: "card-4",
      img: `/images/${Math.floor(Math.random() * 9 + 2)}${
        suits[Math.floor(Math.random() * 3)]
      }.svg`
    },
    "card-5": {
      id: "card-5",
      img: `/images/${Math.floor(Math.random() * 9 + 2)}${
        suits[Math.floor(Math.random() * 3)]
      }.svg`
    },
    "card-6": {
      id: "card-6",
      img: `/images/${Math.floor(Math.random() * 9 + 2)}${
        suits[Math.floor(Math.random() * 3)]
      }.svg`
    },
    "card-7": {
      id: "card-7",
      img: `/images/${Math.floor(Math.random() * 9 + 2)}${
        suits[Math.floor(Math.random() * 3)]
      }.svg`
    },
    "card-8": {
      id: "card-8",
      img: `/images/${Math.floor(Math.random() * 9 + 2)}${
        suits[Math.floor(Math.random() * 3)]
      }.svg`
    },
    "card-9": {
      id: "card-9",
      img: `/images/${Math.floor(Math.random() * 9 + 2)}${
        suits[Math.floor(Math.random() * 3)]
      }.svg`
    }
  },
  columns: {
    "column-1": {
      id: "column-1",
      title: "Hand",
      cardIds: [
        "card-1",
        "card-2",
        "card-3",
        "card-4",
        "card-5",
        "card-6",
        "card-7",
        "card-8",
        "card-9"
      ]
    },
    "column-4": {
      id: "column-4",
      title: "Play",
      cardIds: []
    }
  },
  columnOrder: ["column-1", "column-4"]
};

export default initialData;
