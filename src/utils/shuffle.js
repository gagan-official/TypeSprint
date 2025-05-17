// Fisher-Yates Shuffle Method:
export default function shuffleArray(array) {
  let shuffledArray = [...array]; // Clone the array to avoid mutating the original
  let currentIndex = shuffledArray.length,
    randomIndex;

  // While there remain elements to shuffle
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // Swap elements
    [shuffledArray[currentIndex], shuffledArray[randomIndex]] = [
      shuffledArray[randomIndex],
      shuffledArray[currentIndex],
    ];
  }

  return shuffledArray;
}
