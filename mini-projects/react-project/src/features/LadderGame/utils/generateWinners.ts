// 당첨자 추첨
export const generateWinners = (
  participants: number,
  numOfWinners: number,
  setWinners: (winners: boolean[]) => void
) => {
  const arr = Array.from({ length: participants }).map(Boolean);

  let i = 0;

  while (arr.filter((b) => b === true).length < numOfWinners) {
    const result = Math.floor(Math.random() * 2);

    arr[i] = result === 0 ? false : true;

    if (i === arr.length - 1) {
      i = 0;
    } else {
      i++;
    }
  }

  setWinners(arr);
};
