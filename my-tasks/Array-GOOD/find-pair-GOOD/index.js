
function findPair(arr) {

  if (arr.length < 2) {
    return null;
  }

  const myArray = arr.sort();

  let pairs;

  for (let i = 0; i < myArray.length; i++) {
     pairs = myArray[i];

     if (myArray[i] === myArray[i+1]) { return pairs }
  }

  return null
};

window.findPair = findPair;

export default findPair;
