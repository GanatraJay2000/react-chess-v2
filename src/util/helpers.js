export function getChar(code) {
  return String.fromCharCode(code + 96);
}

export function getAxes() {
  const ranks = Array(8)
    .fill()
    .map((_, i) => 8 - i);

  const files = Array(8)
    .fill()
    .map((_, i) => i + 1);

  return { ranks, files };
}

export const createBoard = () => {
  return [];
};

export const getCoords = (square) => ({
  rank: 8 - parseInt(square[1]),
  file: square.charCodeAt(0) - 97,
});

export const coordinates = (ref, e) => {
  const { width, left, top } = ref.current.getBoundingClientRect();
  const size = width / 8;
  const y = getChar(Math.floor((e.clientX - left) / size) + 1);
  const x = 8 - Math.floor((e.clientY - top) / size);
  return { x, y };
};

export const copyBoard = (board) => {
  const copy = [];
  for (let i = 0; i < board.length; i++) {
    copy.push([...board[i]]);
  }
  return copy;
};
