function fullSum(...arg) {

  if (arg.length === 0) {
    return 0;
  }

  let result = 0;

  for (let item of arg) {
 
    if (typeof item !== 'number' || isNaN(item)) {
      throw new Error("Wrong arguments type!")
    }

    result += item;

  }

  
  return result;
}


window.fullSum = fullSum;

export default fullSum;
