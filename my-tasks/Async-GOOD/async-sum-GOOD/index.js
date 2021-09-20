
function asyncSum(a, b) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {

      if (typeof a !== 'number' || typeof b !== 'number') {
        reject(new Error('Ошибка'));
      } else {
        return resolve(a + b);
      }


    }, 1000);
  });
}


window.asyncSum = asyncSum;

export default asyncSum;

